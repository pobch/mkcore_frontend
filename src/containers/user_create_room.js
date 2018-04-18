import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RoomDetail from './own_room_detail'
import { createRoom } from '../actions'


class CreateRoom extends Component {
  renderField = (field) => {
    return (
      <div>
        <label htmlFor={field.input.name}>{field.label}</label>
        <input type={field.type} {...field.input}/>
      </div>
    )
  }

  onSubmit = (values) => {
    values.guests = null
    values.user = null
    this.props.createRoom(values)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <Field
            name="title"
            component={this.renderField}
            type="text"
            label="Input Room Title"
          />
          <Field
            name="description"
            component={this.renderField}
            type="text"
            label="Input Description"
          />
          <button className="btn btn-primary" type="submit">Submit</button>
          <Link className="btn btn-danger" to="/user/rooms">Cancel</Link>
        </form>
        <RoomDetail match={{params: {id:13}}}/>
      </div>
    )
  }
}

export default connect(null, { createRoom })(reduxForm({form: 'createRoomForm'})(CreateRoom))
