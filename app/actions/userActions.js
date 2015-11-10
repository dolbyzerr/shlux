import {put} from 'enso'

export function changeUserName(newUserName) {
  put((state) => state.setIn(['user', 'name'], newUserName))
}
