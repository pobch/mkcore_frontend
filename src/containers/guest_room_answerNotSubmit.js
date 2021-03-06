import React, {Component} from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import TopTabBar from '../components/topTabBar'
import ViewRoomInfo from '../components/room_view_info'
import ViewAttachedLinks from '../components/room_view_attachedLinks'
import GuestAnswer from '../components/guest_formElement_answer1'
import Loading from '../components/loading'
import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'
import SaveCompleteModal from '../components/modal_save_complete'

import {
  fetchGuestRoom, saveNewAnswer, updateAnswer,
  fetchAnswerFromRoomId, resetError, fetchJoinReqOfMeByRoomId
} from '../actions'
import messenger from '../static/messenger.png'

class GuestEditRoom extends Component {

  state = {
    FinishAnswerConfirmPopup: false,
    openSaveCompleteModal: false
  }

  componentDidMount() {
    window.scrollTo(0,0)
    const roomId = this.props.match.params.id
    this.props.fetchAnswerFromRoomId(roomId)
    this.props.fetchGuestRoom(roomId)
    this.props.fetchJoinReqOfMeByRoomId(roomId)
  }

  componentWillUnmount() {
    this.props.resetError()
  }

  onSubmit = async (values) => {
    const roomId = this.props.match.params.id
    if(!this.props.answerExist) { // use POST method to create new row (new relation between guest-answer-room)

      if(values.fromSaveButton) { // click 'Save' button

        delete values.fromSaveButton
        await this.props.saveNewAnswer(roomId, values) // POST method
        this.setState({openSaveCompleteModal: true})

      } else { // click 'Submit' button

        values.submitted_at = new Date()
        values.submitted = true
        // save new instance variables to use at <ConfirmModal/>
        this.finishedAnsValues = values
        this.saveFinishedAnsToRoomId = roomId

        this.setState({FinishAnswerConfirmPopup: true})
      }

    } else { // use PATCH method to update existing row

      if(values.fromSaveButton) { // click 'Save' button

        delete values.fromSaveButton
        await this.props.updateAnswer(this.props.rowId, values) // PATCH method
        this.setState({openSaveCompleteModal: true})

      } else { // click 'Submit' button

        values.submitted_at = new Date()
        values.submitted = true
        // save new instance variables to use at <ConfirmModal/>
        this.finishedAnsValues = values
        this.updateFinishedAnsToRowId = this.props.rowId

        this.setState({FinishAnswerConfirmPopup: true})
      }
    }
  }

  closeModal = () => {
    this.setState({ FinishAnswerConfirmPopup: false})
  }

  render() {
    if(!this.props.survey || !this.props.room || !this.props.joinReqsInfo.myRelationAtCurrentRoom) {
      return <Loading />
    }

    const { handleSubmit } = this.props
    const { expire_date } = this.props.joinReqsInfo.myRelationAtCurrentRoom // can be null

    let fbIcon = '';
    if ( this.props.room.social_urls.facebook ) {
      let fbLink = this.props.room.social_urls.facebook
      if ( fbLink.substr(-1) === '/' ) {
        fbLink = fbLink.substr(0, fbLink.length - 1);
      }
      const fbId = fbLink.substring(fbLink.lastIndexOf("/") + 1);
      fbIcon = (
        <a className="messenger-icon" target="_blank" href={`https://m.me/${fbId}`}>
          <img src={messenger} width="100" height="100" alt="Messenger"/>
        </a>
      )
    }

    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">{`ห้อง "${this.props.room.title}"`}</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2={ _.isEmpty(this.props.room.attached_links) ? '' : 'ไฟล์แนบ' }
          titleTab3={ _.isEmpty(this.props.room.survey) ? '' : "แบบสอบถาม"}
        />
        <div className="tab-content">
          <div className="tab-body">
            <div className='tab-item'>
              <ViewRoomInfo room={this.props.room} expireDate={ expire_date && new Date(expire_date) }/>
            </div>
            {_.isEmpty(this.props.room.attached_links) ||
              <div className='tab-item'>
                <ViewAttachedLinks room={this.props.room}/>
              </div>
            }
            {_.isEmpty(this.props.room.survey) ||
              <div className='tab-item'>
                <form className="form-minimal number" onSubmit={handleSubmit(this.onSubmit)}>
                  <GuestAnswer
                    survey={this.props.survey}
                    onClickSave={
                      handleSubmit(values => {
                        this.onSubmit({
                          ...values,
                          fromSaveButton: true
                        })
                      })
                    }
                  />
                </form>
              </div>
            }
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/guest/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
          </div>
        </div>
        {fbIcon}

        {/* Confirm Finish Answer Modal */}
        <Portal>
          <ConfirmModal
            className={this.state.FinishAnswerConfirmPopup ? 'modal show' : 'modal hide'}
            modalBody="หลังจากส่งคำตอบแล้ว คุณจะไม่สามารถกลับมาแก้ไขได้อีก ยืนยันที่จะส่งคำตอบ?"
            onCancel={ this.closeModal }
            onConfirm={ () => {
              if(this.saveFinishedAnsToRoomId) { // use POST method
                this.props.saveNewAnswer(this.saveFinishedAnsToRoomId, this.finishedAnsValues)
              } else if(this.updateFinishedAnsToRowId) { // use PATCH method
                this.props.updateAnswer(this.updateFinishedAnsToRowId, this.finishedAnsValues)
              }
              this.props.history.push('/guest/rooms')
            }}
          />
        </Portal>

        {/* Answer Saved */}
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
  try {
    // ownProps.match.params.id is String type
    const room = _.find(state.guestRooms, ['id', +ownProps.match.params.id])
    if(!room) {
      return {
        room,
        survey: null
      }
    }

    // build initialValues
    const {survey} = room
    const existAnswerRow = _.find(state.answers, ['room', +ownProps.match.params.id])
    let answerField = []
    let answerExist = false
    let rowId = null
    if(existAnswerRow) { // case: the guest has already answered the survey before.
      answerField = existAnswerRow.answer
      answerExist = true
      rowId = existAnswerRow.id
    } else { // case: there is the room's survey and the guest has never answered the survey yet
      survey.forEach((eachQuestion, indx) => {
        // Important !!! this is the initial structure of each answer:
        const eachAnswer = {
          id: indx + 1,
          questionId: eachQuestion.id,
          question: eachQuestion.question,
          answerType: eachQuestion.answerType
        }
        // no initialValues for 'answerText' and 'answerChoice'
        answerField.push(eachAnswer)
      })
    }
    return {
      room,
      survey,
      initialValues: {answer: answerField},
      answerExist,
      rowId,
      joinReqsInfo: state.joinReqsInfo
    }
  } catch(error) {
    return
  }
}

export default connect(mapStateToProps,
  {
    fetchGuestRoom, saveNewAnswer, updateAnswer, fetchAnswerFromRoomId, resetError, fetchJoinReqOfMeByRoomId
  })(
    reduxForm({
      form: 'answerForm',
      enableReinitialize: true
    })(GuestEditRoom)
  )
