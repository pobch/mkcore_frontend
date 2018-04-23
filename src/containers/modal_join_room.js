import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {joinRoomAction} from '../actions'


class JoinRoomModal extends Component {
  onSubmit = (values) => {
    this.props.closeModalFunc()
    this.props.joinRoomAction(values)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div id="myModal">
        <div id="myModalContent">
          <div>
            <h4>Join Room</h4>
          </div>
          <div>
            <form onSubmit={ handleSubmit(this.onSubmit) }>
              <label htmlFor="room_code">Room's code to Join</label>
              <Field
                name="room_code"
                component="input"
                type="text"
              />
              <label htmlFor="room_password">Room's password</label>
              <Field
                name="room_password"
                component="input"
                type="password"
              />

              <div>
                <button type="submit" className="btn btn-danger">Join</button>
                <button type="button" className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {joinRoomAction})(
  reduxForm({
    form: 'joinRoomModalForm'
  })(JoinRoomModal)
)