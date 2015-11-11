import store from '../store'
import {setTimeZone} from './meetingActions'

export function changeCountry(countryCode) {
  store.set('countryCode', countryCode)
  const timeZonesInCountry = store.getIn(['timeZones', countryCode])

  if (timeZonesInCountry && timeZonesInCountry.size === 1) {
    setTimeZone(timeZonesInCountry.first().get('value'))
  } else {
    setTimeZone(null)
  }
}

export function changeTimeZone(timeZone) {
  setTimeZone(timeZone)
}
