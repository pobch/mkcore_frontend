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
      return <div>Loading...</div>
    }

    if(this.props.room.detail) { // there is an error msg
      return <div>ERROR = {this.props.room.detail}</div>
    }

    const { handleSubmit } = this.props
    const { id } = this.props.match.params

    return (
      <div className="wrapper">
        <div className="header">แก้ไขห้อง</div>
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
          <div className="tab-footer clearfix">
            <Link to="/owner/rooms" className="btn basic float-left">
              <i className="twf twf-chevron-left before" />
              ย้อนกลับ
            </Link>
            <button type="submit" className="float-right">
              <i className="twf twf-floppy before" />
              บันทึก
            </button>
          </div>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            htmlId={this.saveCompleteModalHtmlId}
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
