import store from '../store'

export function changeUserName(newUserName) {
  store.setIn(['user', 'name'], newUserName)
}
