import Immutable, {fromJS} from 'immutable'
import EventEmitter from 'events'

const immediateFunction = (window && window.requestAnimationFrame) || setTimeout

export default class Store extends EventEmitter {
  constructor(){
    super()
    this.data = Immutable.Map()
    this.changeFired = true
  }

  get(key) {
    if (!key) {
      return this.data.toJS()
    } else {
      return this.data.get.apply(this.data, arguments)
    }
  }

  has(key) {
    return this.data.has(key)
  }

  contains(value) {
    return this.data.contains(fromJS(value))
  }

  getIn(path) {
    return this.data.getIn(path)
  }

  hasIn(path) {
    return this.data.hasIn(path)
  }

  set(key, value) {
    this._onChange(this.data, this.data.set(key, fromJS(value)))
  }

  setIn(key, value) {
    this._onChange(this.data, this.data.setIn(key, fromJS(value)))
  }

  delete(key) {
    this._onChange(this.data, this.data.delete(key))
  }

  deleteIn(key) {
    this._onChange(this.data, this.data.deleteIn(key))
  }

  clear() {
    this._onChange(this.data, this.data.clear())
  }

  merge(value) {
    this._onChange(this.data, this.data.merge(fromJS(value)))
  }

  mergeWith(merger, value) {
    this._onChange(this.data, this.data.mergeWith(merger, fromJS(value)))
  }

  mergeDeep(value) {
    this._onChange(this.data, this.data.mergeDeep(fromJS(value)))
  }

  mergeDeepWith(merger, value) {
    this._onChange(this.data, this.data.mergeDeepWith(merger, fromJS(value)))
  }

  _onChange(prevState, newState) {
    if (!prevState.equals(newState)) {
      this.data = newState
      if (this.changeFired) {
        immediateFunction(() => {
          this.emit('change', this.get())
          this.changeFired = true
        })
        this.changeFired = false
      }
    }
  }
}
