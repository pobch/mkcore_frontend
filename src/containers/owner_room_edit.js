import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import { reduxForm } from 'redux-form'

import TopTabBar from '../components/topTabBar'
import RoomInfoEdit from '../components/owner_formElement_roomInfo'
import SurveyEdit from '../components/owner_formElement_survey1'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import {fetchOwnRoom, updateRoom} from '../actions'

import {validateOwnRoomCreateEdit} from '../form_validators'


class EditRoom extends Component {
  
  state = {
    openSaveCompleteModal: false
  }
  
  componentDidMount() {
    window.scrollTo(0,0)
    const { id } = this.props.match.params
    this.props.fetchOwnRoom(id)
  }

  onSubmit = (values) => {
    const { id } = this.props.match.params
    this.props.updateRoom(id, values)
    this.setState({openSaveCompleteModal: true})
  }

  render() {
    if(!this.props.room) { // initial state
      return <div>Loading...</div>
    }

    if(this.props.room.detail) { // there is an error msg
      return <div>ERROR = {this.props.room.detail}</div>
    }
    
    const { handleSubmit } = this.props
    const { id } = this.props.match.params
    
    return (
      <div>
        
        <h5>Edit this room</h5>
        <hr/>

        <TopTabBar 
          titleTab1="Edit Info"
          titleTab2="Edit Survey"
        />

        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <div className='content-tab1'>
            <RoomInfoEdit roomCodeDisabled={true}/>
          </div>
          <div className='content-tab2'>
            <SurveyEdit roomId={id}/>
          </div>
        </form>
        
        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
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
    roomData.survey = roomData.survey || [] // We'll use .forEach in <SurveyEdit/>
  }
  return {
    room: roomData,
    initialValues: roomData
  }
}

export default connect(mapStateToProps, { fetchOwnRoom, updateRoom })(
  reduxForm({
    form: 'editOwnRoomForm',
    enableReinitialize: true,
    validate: validateOwnRoomCreateEdit
  })(EditRoom)
)