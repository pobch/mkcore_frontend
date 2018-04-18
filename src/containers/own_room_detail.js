import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {fetchOwnRoom, updateRoom} from '../actions'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'


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
          <textarea {...field.input} /> :
          <input 
            type={field.type}
            {...field.input}
          />
        }
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
          <h5>Edit this room</h5>
          <h6>{this.props.room.title}</h6>
          <Field 
            name="title"
            component={this.renderField}
            label="Room Title"
            type="text"
          />
          <br/>
          <Field
            name="description"
            component={this.renderField}
            label="Room Description"
            type="textarea"
          />

          <button type="submit" className="btn btn-primary">Save</button>
          <Link to='/user/rooms' className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    room: _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id] || state.ownRooms[0],
    initialValues: _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id] || state.ownRooms[0]
  }
}

export default connect(mapStateToProps, { fetchOwnRoom, updateRoom })(
  reduxForm({
    form: 'editOwnRoomForm'
  })(RoomDetail)
)