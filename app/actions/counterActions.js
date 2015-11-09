import store from '../store'

export function inc(increment = 1) {
  const counter = store.get('counter') || 0
  store.set('counter', counter + increment)
}

export function dec(decrement = 1) {
  const counter = store.get('counter') || 0
  store.set('counter', counter - decrement)
}

export function setCounter(value = 0) {
  store.set('counter', value)
}

export function asyncInc(increment = 1) {
  store.set('loading', true)
  setTimeout(() => {
    store.set('loading', false)
    inc(increment)
  }, 1000)
}
