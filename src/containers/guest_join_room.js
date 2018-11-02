import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {joinRoomAction} from '../actions'


class JoinRoom extends Component {

  onSubmit = async (values) => {
    await this.props.joinRoomAction(values)
    this.props.reset()
  }

  renderField = (field) => {
    return (
      <input type={field.type} placeholder={field.placeholder} {...field.input}/>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className="form-inline" onSubmit={ handleSubmit(this.onSubmit) }>
        <Field
          name="room_code"
          component={this.renderField}
          type="text"
          placeholder="รหัสห้อง"
        />
        <button type="submit" className="plain">
          <i className="twf twf-arrow-bold-right" />
        </button>
      </form>
    )
  }
}

export default connect(null, {joinRoomAction})(
  reduxForm({
    form: 'joinRoomForm'
  })(JoinRoom)
)
