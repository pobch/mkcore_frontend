import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { Link } from 'react-router-dom'

import SurveyEdit from '../components/owner_survey_edit'
import TopTabBar from '../components/topTabBar'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import {fetchOwnRoom, updateRoom} from '../actions'

import 'react-widgets/dist/css/react-widgets.css'


Moment.locale('en')
momentLocalizer()

class EditRoom extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
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
    console.log('id ===', id)
    console.log('values ===', values)
    // this.props.updateRoom(id, values)
  }

  renderField = (field) => {
    return (
      <div className="form-group">
        <label htmlFor={field.input.name}>{field.label}</label><br/>
        { field.type === 'disabled'
          ? <input className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea' 
          ? <textarea className="form-control" {...field.input} rows="5" cols="25"/> 
          : <input className="form-control" type={field.type} {...field.input}/>
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

  render() {
    if(!this.props.room) { // initial state
      return <div>Loading...</div>
    }

    if(this.props.room.detail) { // there is an error msg
      return <div>ERROR = {this.props.room.detail}</div>
    }
    
    const { handleSubmit } = this.props
    const {id} = this.props.match.params
    
    return (
      <div>
        
        <h5>Edit this room</h5>
        <hr/>

        <TopTabBar 
          title_tab1="Edit Info" 
          linkPath_tab1={`/owner/rooms/${id}`}
          title_tab2="Create/Edit Survey"
          linkPath_tab2={`/owner/rooms/${id}/survey`}
        />

        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <div className='content-tab1'>
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
              type="disabled"
            />
            {/* <Field
              name="room_password"
              component={this.renderField}
              label="Your Room's Password (guests will use this code and password to join this room)"
              type="text"
            /> */}
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
            <hr/>
            <div>
              <button type="submit" className="btn btn-primary my-2">Save</button>
              <Link to="/owner/rooms" className="btn btn-danger my-2">Cancel</Link>
              {/* <button type="button" onClick={ this.props.history.goBack } className="btn btn-danger">Back</button> */}
            </div>
          </div>
          <div className='content-tab2'>
              <SurveyEdit room={this.props.room}/>
          </div>
        </form>
        
        <Portal>
          <SaveCompleteModal
            htmlId={this.saveCompleteModalHtmlId}
            onConfirm={(event) => {
              this.setState({showSaveCompleteModal: false})
            }}
          />
        </Portal>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const roomData = _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id]
  if(roomData) {
    roomData.survey = roomData.survey || []
  }
  return {
    room: roomData,
    initialValues: roomData
  }
}

export default connect(mapStateToProps, { fetchOwnRoom, updateRoom })(
  reduxForm({
    form: 'editOwnRoomForm',
    enableReinitialize: true
  })(EditRoom)
)