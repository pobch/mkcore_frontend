import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {fetchOwnRoom, updateRoom} from '../actions'
import { reduxForm, Field } from 'redux-form'
import { DateTimePicker, DropdownList } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { Link } from 'react-router-dom'

import 'react-widgets/dist/css/react-widgets.css'


Moment.locale('en')
momentLocalizer()

const publish = ['draft', 'active', 'closed']

class RoomDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchOwnRoom(id)
  }
  
  // renderRoom = () => {
  //   const { id } = this.props.match.params
  //   return _.map(this.props.room, (value, key) => {
  //     return (
  //       <li key={key}>
  //         {key + ' >>>>> ' + String(value)}
  //       </li>
  //     )
  //   })
  // }

  onSubmit = (values) => {
    const { id } = this.props.match.params
    this.props.updateRoom(id, values)
  }

  renderField = (field) => {
    return (
      <div>
        <label htmlFor={field.input.name}>{field.label}</label><br/>
        { field.type === 'textarea' ? 
          <textarea {...field.input} rows="5" cols="25"/> :
          <input type={field.type} {...field.input}/>
        }
      </div>
    )
  }

  renderDateTime = ({ input: {name, onChange, value}, label }) => {
    return (
      <div>
        <label htmlFor={name}>{label}</label><br/>
        <DateTimePicker onChange={onChange} value={value ? new Date(value) : null }/>
      </div>
    )
  }

  renderDropdownList = ({ input, label, data }) => {
    return (
      <div>
        <label htmlFor={input.name}>{label}</label><br/>
        <DropdownList {...input} data={data}/>
      </div>
    )
  }

  render() {
    if(!this.props.room) { // initial state
      return <div>Loading...</div>
    }

    if(this.props.room.detail) { // there is an error msg
      return <div>ERROR = {this.props.room.detail}</div>
    }
    
    const { handleSubmit } = this.props
    
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit) }>

          <div>
            <Link to={`/user/rooms/${this.props.room.id}/survey`} className="btn btn-primary">Edit Survey</Link>
          </div>

          <h5>Edit this room</h5>
          <Field 
            name="title"
            component={this.renderField}
            label="Room Title"
            type="text"
          />
          <Field
            name="description"
            component={this.renderField}
            label="Room Description"
            type="textarea"
          />
          <Field
            name="instructor_name"
            component={this.renderField}
            label="Survey Owner's Name :"
            type="text"
          />
          <Field
            name="room_code"
            component={this.renderField}
            label="Your Room's Code (guests will use this code and password to join this room)"
            type="text"
          />
          <Field
            name="room_password"
            component={this.renderField}
            label="Your Room's Password (guests will use this code and password to join this room)"
            type="text"
          />
          <Field
            name="start_at"
            component={this.renderDateTime}
            label="Room start at :"
            type=""
          />
          <Field
            name="end_at"
            component={this.renderDateTime}
            label="Room end at :"
            type=""
          />
          <Field
            name="status"
            component={this.renderDropdownList}
            label="Draft, Publish or Close this room?"
            type=""
            data={publish}
          />

          <div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={ this.props.history.goBack } className="btn btn-danger">Cancel</button>
          </div>
        </form>
          <p>
            <i>
              Current Room Title : {this.props.room.title}
              <br/>
              Current Description : {this.props.room.description}
              <br/>
              Current Survey Owner/ Instructor : {this.props.room.instructor_name}
              <br/>
              Current Room's Code : {this.props.room.room_code}
              <br/>
              Current Room's Password : {this.props.room.room_password}
            </i>
          </p>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const roomData = _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id]
  return {
    room: roomData,
    initialValues: roomData
  }
}

export default connect(mapStateToProps, { fetchOwnRoom, updateRoom })(
  reduxForm({
    form: 'editOwnRoomForm'
  })(RoomDetail)
)