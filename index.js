var Immutable = require('immutable')
var Cursor = require('immutable/contrib/cursor')
var fromJS = Immutable.fromJS
var immediateFunction = ((typeof window !== 'undefined') && window.requestAnimationFrame) || (function(cb) { setTimeout(cb, 0) })

function Store() {
  this._data = Immutable.Map()
  this._listeners = {}
  this._cursor = Cursor.from(this._data, [], this._onChange.bind(this))
  this._changeFired = true
  this._syncUpdate = false
}

Store.prototype = {
  clear: function() {
    this._cursor = this._cursor.clear()
    return this
  },

  get: function(key) {
    if (key === undefined) {
      return this._cursor.toJS()
    } else {
      return this._cursor.get(key)
    }
  },

  getIn: function(path) {
    return this._cursor.getIn(path)
  },

  set: function(key, value) {
    this._cursor = this._cursor.set(key, fromJS(value))
    return this
  },

  setIn: function(path, value) {
    this._cursor = this._cursor.setIn(path, fromJS(value))
    return this
  },

  merge: function(value) {
    this._cursor = this._cursor.merge(fromJS(value))
    return this
  },

  mergeIn: function(path, value) {
    this._cursor = this._cursor.mergeIn(path, fromJS(value))
    return this
  },

  delete: function(key) {
    this._cursor = this._cursor.delete(key)
    return this
  },

  deleteIn: function(path, value) {
    this._cursor = this._cursor.deleteIn(path, value)
    return this
  },

  on: function(eventName, cb) {
    if (!this._listeners[eventName]) { this._listeners[eventName] = [] }
    this._listeners[eventName].push({func: cb, once: false})
  },

  once: function(eventName, cb) {
    if (!this._listeners[eventName]) { this._listeners[eventName] = [] }
      this._listeners[eventName].push({func: cb, once: true})
  },

  off: function(eventName, cb) {
    if (!eventName) {
      this._listeners = {}
    } else if(!cb) {
      this._listeners[eventName] = []
    } else {
      var listeners = this._listeners[eventName]
      if (listeners) {
        this._listeners = listeners.filter(function(listener) {
          return listener.func !== cb
        })
      }
    }
  },

  emit: function(eventName) {
    if (eventName && this._listeners[eventName]) {
      var off = this.off

      // Parsing arguments in a simple non-leaking way
      var args = new Array(arguments.length - 1)
      for(var i=1; i <= args.length; i++) { args[i-1] = arguments[i] }

      this._listeners[eventName].forEach(function(listener) {
        listener.func.apply(this, args)
        if (listener.once) { off(eventName, listener.func) }
      })
    }
  },

  listenerCount: function(eventName) {
    return this._listeners[eventName] ? this._listeners[eventName].length : 0
  },

  _onChange: function(state, prevState) {
    if (!prevState.equals(state)) {
      this._data = state
      if (this._syncUpdate) {
        this.emit('change', this._data.toJS())
        this._syncUpdate = false
      } else if (this._changeFired && this.listenerCount('change') > 0) {
        immediateFunction((function() {
          var oldData = this._data
          this.emit('change', this._data.toJS())
          this._changeFired = true

          // If data was changed inside on change callback
          if (!oldData.equals(this._data)) {
            this._onChange(this._data, oldData)
          }
        }).bind(this))
        this._changeFired = false
      }
    }
  }
}

var changeMethods = ['clear', 'set', 'setIn', 'merge', 'mergeIn', 'delete', 'deleteIn']
changeMethods.forEach(function(methodName) {
  Store.prototype[methodName + 'Sync'] = function() {
    this._syncUpdate = true
    return Store.prototype[methodName].apply(this, arguments)
  }
})

module.exports = Store
