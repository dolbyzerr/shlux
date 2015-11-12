import React from 'react'
import {selectTimeSlot} from '../actions/meetingActions'
import {nextStep} from '../actions/appActions'

export default class TimeSlotChooser extends React.Component {
  render() {
    const {selected} = this.props

    return (
      <div>
        {this._renderTimeSlots()}
        <div>
          <button disabled={!selected} onClick={nextStep}>Next</button>
        </div>
      </div>
    )
  }

  _renderTimeSlots() {
    const {timeslots, selected} = this.props

    if (!timeslots) {
      return <span>Loading...</span>
    } else {
      return timeslots.map((slot, index) => {
        return (
          <div key={index}>
            <input
              type='radio'
              name='timeslots'
              value={slot}
              onChange={this._onSelect}
              checked={slot === selected}
            />
            {slot}
          </div>
        )
      })
    }
  }

  _onSelect(e) {
    selectTimeSlot(e.target.value)
  }
}
