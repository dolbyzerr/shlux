import React from 'react'
import {changeUserName} from '../actions/userActions'
import {changeDescription} from '../actions/meetingActions'

export default class MeetingInfo extends React.Component {
  render() {
    const {user, meeting} = this.props

    return (
      <div>
        <div><input type='text' value={user.name} onChange={this._onChangeUsername}/></div>
        <div>
          <textarea value={meeting.description} onChange={this._onChangeDescription} />
        </div>
      </div>
    )
  }

  _onChangeUsername(e) {
    changeUserName(e.target.value)
  }

  _onChangeDescription(e){
    changeDescription(e.target.value)
  }
}
