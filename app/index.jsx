import React from 'react'
import TimeZonePicker from './components/TimeZonePicker'
import TimeSlotChooser from './components/TimeSlotChooser'
import MeetingInfo from './components/MeetingInfo'

export default class App extends React.Component {
  render() {
    const {user, loading, counter} = this.props

    return (
      <div>
        {this._renderStep()}
      </div>
    )
  }

  _renderStep() {
    const {step} = this.props

    switch(step){
      case 2:
        const {user, meeting} = this.props

        return (
          <MeetingInfo
            user={user}
            meeting={meeting}
          />
        )
      case 1:
        const {timeslots, meeting: {timeSlot}} = this.props

        return (
          <TimeSlotChooser
            timeslots={timeslots}
            selected={timeSlot}
          />
        )

      case 0:
      default:
        const {countries, timeZones, meeting: {timeZone}, countryCode} = this.props

        return (
          <TimeZonePicker
            countries={countries}
            timeZones={timeZones}
            timeZone={timeZone}
            countryCode={countryCode}
          />
        )
    }
  }
}
