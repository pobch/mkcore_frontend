import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field, Form, submit} from 'redux-form'

import {joinRoomAction} from '../actions'


class JoinRoomModal extends Component {
  onSubmit = (values) => {
    this.props.closeModalFunc()
    this.props.joinRoomAction(values)
    this.props.reset()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="modal fade" id="joinRoomModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Join Room</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <Form onSubmit={ handleSubmit(this.onSubmit) }>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="room_code">Room's code to Join</label>
                  <Field
                    name="room_code"
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="room_password">Room's password</label>
                  <Field
                    name="room_password"
                    component="input"
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                  onClick={() => this.props.dispatch(submit('joinRoomModalForm'))}>
                Join
                </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" 
                  onClick={this.props.onCancel}>
                Cancel
                </button>
              </div>
            </Form>
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