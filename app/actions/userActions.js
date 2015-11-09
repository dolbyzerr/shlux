import store from '../store'

export function changeName(newName){
  store.setIn(['user', 'name'], newName)
}
