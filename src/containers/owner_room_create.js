import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { createRoom } from '../actions'


class CreateRoom extends Component {
  renderField = (field) => {
    return (
      <div>
        <label htmlFor={field.input.name}>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input}/>
      </div>
    )
  }

  onSubmit = async (values) => {
    try {
      await this.props.createRoom(values)
      this.props.hideComponentAction()
    } catch(error) {
      // console.log('err', error)
    }
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
            label="Room Title :"
          />
          <Field
            name="description"
            component={this.renderField}
            type="text"
            label="Description :"
          />
          <Field
            name="instructor_name"
            component={this.renderField}
            type="text"
            label="Survey Owner's Name :"
          />
          <Field
            name="room_code"
            component={this.renderField}
            type="text"
            label="Your Room's Code (guests will use this code and password to join this room)"
          />
          {/* <Field
            name="room_password"
            component={this.renderField}
            type="text"
            label="Your Room's Password (guests will use this code and password to join this room)"
          /> */}

          <button className="btn btn-primary" type="submit">Save</button>
          <Link className="btn btn-danger" to="/owner/rooms">Close</Link>
        </form>
        {/* <EditRoom match={{params: {id:13}}}/> */}
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, { createRoom })(
  reduxForm({
    form: 'createRoomForm',
    validate
  })(CreateRoom))
