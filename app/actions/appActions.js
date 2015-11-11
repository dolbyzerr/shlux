import store from '../store'

export function nextStep(e) {
  const nextStep = store.get('step') + 1
  const timeZone = store.getIn(['meeting', 'timeZone'])

  if (nextStep == 1) {
    fetchSlots(timeZone)
      .then((resp) => {
        store.set('timeslots', resp.slots)
      })
      .catch(() => {
        store.set('errors', ['Something bad happened'])
      })
  }

  store.set('step', nextStep)
}

function fetchSlots(timeZone) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({slots: ['12:00', '13:00']})
    }, 1000)
  })
}
