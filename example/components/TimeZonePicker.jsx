import React from 'react'
import {changeCountry, changeTimeZone} from '../actions/timeZonePickerActions'
import {nextStep} from '../actions/appActions'

const preventDefault = (cb) => (e) => {e.preventDefault(); cb(e)}

export default class TimeZonePicker extends React.Component {
  render(){
    const timeZoneSelected = !!this.props.timeZone
    return (
        <div>
          <div>{this._renderContrySelect()}</div>
          <div>{this._renderTimeZoneSelect()}</div>
          <button disabled={!timeZoneSelected} onClick={preventDefault(nextStep)}>Next</button>
        </div>
    )
  }

  _renderContrySelect() {
    const {countryCode} = this.props

    return (
      <select value={countryCode} onChange={this._onCountryChange}>
        {this._renderCountries()}
      </select>
    )
  }

  _renderCountries() {
    const {countries} = this.props

    if (countries) {
      return countries.map((country, index) => <option value={country.code} key={index}>{country.name}</option>)
    } else {
      return null
    }
  }

  _renderTimeZoneSelect() {
    const {timeZone, timeZones, countryCode} = this.props

    return (
      <select value={timeZone} disabled={!timeZones[countryCode]} onChange={this._onChangeTimeZone}>
        {this._renderTimeZones()}
      </select>
    )
  }

  _renderTimeZones() {
    const {timeZone, timeZones, countryCode} = this.props

    if (timeZones[countryCode]) {
      return timeZones[countryCode].map((timeZone, index) => <option value={timeZone.value} key={index}>{timeZone.name}</option>)
    } else {
      return <option>Select country</option>
    }
  }

  _onCountryChange(e) {
    changeCountry(e.target.value)
  }

  _onChangeTimeZone(e) {
    changeTimeZone(e.target.value)
  }
}
