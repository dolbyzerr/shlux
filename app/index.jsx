import React from 'react'
import {asyncInc as inc, setCounter} from './actions/counterActions'
import {changeName} from './actions/userActions'

export default class App extends React.Component {
  render() {
    const {user, loading, counter} = this.props

    return (
      <div>
        {counter}
        <input type='text' value={user.name} onChange={this.onUserNameChange} />
        <button onClick={this.onClick} disabled={loading}>Click me</button>
        <button onClick={this.onSetCounterToOne}>Set counter to 1</button>
      </div>
    )
  }

  onClick() {
    inc()
  }

  onSetCounterToOne() {
    setCounter(1)
  }

  onUserNameChange(e) {
    changeName(e.target.value)
  }
}
