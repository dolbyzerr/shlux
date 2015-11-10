import {put} from 'enso'
import {setTimeZone} from './meetingActions'

export function changeCountry(countryCode) {
  put((state) => {
    const timeZones = state.getIn(['timeZones', countryCode])
    if (timeZones.size === 1) {
      setTimeZone(timeZones.first().get('value'))
    } else {
      setTimeZone(null)
    }

    return state.set('countryCode', countryCode)
  })
}

export function changeTimeZone(timeZone) {
  setTimeZone(timeZone)
}
