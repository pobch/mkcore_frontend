import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import { reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'

import TopTabBar from '../components/topTabBar'
import RoomInfoEdit from '../components/owner_formElement_roomInfo'
import SurveyEdit from '../components/owner_formElement_survey1'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'
import Loading from '../components/loading'

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
    if(!values.survey) {
      values.survey = []
    } else {
      _.map(values.survey, (eachQuestion, indx) => {
        eachQuestion.id = indx + 1
        return eachQuestion
      })
    }
    const { id } = this.props.match.params
    this.props.updateRoom(id, values)
    this.setState({openSaveCompleteModal: true})
  }

  render() {
    if(!this.props.room) { // initial state
      return <Loading />
    }

    if(this.props.room.detail) { // there is an error msg
      return <div>ERROR = {this.props.room.detail}</div>
    }

    const { handleSubmit } = this.props
    const { id } = this.props.match.params

    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">แก้ไขห้อง</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2="แบบสอบถาม"
        />
        <form
          className="tab-content"
          onSubmit={ handleSubmit(this.onSubmit) }
        >
          <div className="tab-body">
            <div className='tab-item'>
              <RoomInfoEdit roomCodeDisabled={true}/>
            </div>
            <div className='tab-item'>
              <SurveyEdit roomId={id}/>
            </div>
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/owner/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
            <button type="submit" className="float-right">
              บันทึก
            </button>
          </div>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            onConfirm={(event) => {
              this.setState({openSaveCompleteModal: false})
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
    initialValues: _.pick(roomData, ['title', 'description', 'room_code',
      'room_password', 'instructor_name', 'survey', 'start_at', 'end_at', 'image_url'
    ])
  }
}

export default connect(mapStateToProps, { fetchOwnRoom, updateRoom })(
  reduxForm({
    form: 'editOwnRoomForm',
    enableReinitialize: true,
    validate: validateOwnRoomCreateEdit
  })(EditRoom)
)
