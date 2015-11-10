import {put} from 'enso'
import I from 'immutable'

export function nextStep(e) {
  put((state) => {
    const nextStep = state.get('step') + 1
    const timeZone = state.getIn(['meeting', 'timeZone'])

    if (nextStep == 1) {
      fetchSlots(timeZone)
        .then((resp) => {
          put((state) => {
            return state.set('timeslots', I.fromJS(resp.slots))
          })
        })
        .catch(() => {
          put((state) => {
            return state.set('errors', ['Something bad happened'])
          })
        })
    }

    return state.set('step', nextStep)
  })
}

function fetchSlots(timeZone) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({slots: ['12:00', '13:00']})
    }, 1000)
  })
}
