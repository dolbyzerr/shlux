import Immutable from 'immutable'
import EventEmitter from 'events'

class Store extends EventEmitter {
  constructor(){
    super()
    this.data = Immutable.Map()
    this.changeFired = true
  }

  get(key) {
    if (!key) {
      return this.data.toJS()
    } else if(key instanceof Array) {
      return this.data.getIn(key)
    } else if(this.data.has(key)){
      return this.data.get(key)
    }
  }

  set(key, value) {
    const newData = this.data.set(key, Immutable.fromJS(value))
    this._onChange(this.data, newData)
  }

  setIn(key, value){
    const newData = this.data.setIn(key, Immutable.fromJS(value))
    this._onChange(this.data, newData)
  }

  _onChange(prevState, newState) {
    if (prevState !== newState) {
      this.data = newState
      if (this.changeFired) {
        window.requestAnimationFrame(() => {
          this.emit('change', this.get())
          this.changeFired = true
        })
        this.changeFired = false
      }
    }
  }
}

export default new Store()
