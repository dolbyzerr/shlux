import {put} from 'enso'

export function changeDescription(newDescription){
  put((state) => state.setIn(['meeting', 'description'], newDescription))
}

export function setTimeZone(timeZone) {
  put((state) => state.setIn(['meeting', 'timeZone'], timeZone))
}

export function selectTimeSlot(timeSlot) {
  put((state) => state.setIn(['meeting', 'timeSlot'], timeSlot))
}
