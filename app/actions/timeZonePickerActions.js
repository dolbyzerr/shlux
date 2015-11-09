import store from '../store'
import {setTimeZone} from './meetingActions'

export function changeCountry(countryCode) {
  store.set('countryCode', countryCode)
  const timeZones = store.get(['timeZones', countryCode])
  if (timeZones.size === 1) {
    setTimeZone(timeZones.first().get('value'))
  } else {
    setTimeZone(null)
  }
}

export function changeTimeZone(timeZone) {
  setTimeZone(timeZone)
}
