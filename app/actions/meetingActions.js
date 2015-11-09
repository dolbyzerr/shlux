import store from '../store'

export function changeDescription(newDescription){
  store.setIn(['meeting', 'description'], newDescription)
}

export function setTimeZone(timeZone) {
  store.setIn(['meeting', 'timeZone'], timeZone)
}

export function selectTimeSlot(timeSlot) {
  store.setIn(['meeting', 'timeSlot'], timeSlot)
}
