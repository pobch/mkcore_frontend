import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import GuestAnswer from '../components/guest_formElement_answer'

import {
  fetchGuestRoom, saveNewAnswer, updateAnswer, 
  fetchAnswerFromRoomId, resetError
} from '../actions'


class GuestEditRoom extends Component {

  componentDidMount() {
    window.scrollTo(0,0)
    const roomId = this.props.match.params.id
    this.props.fetchAnswerFromRoomId(roomId)
    this.props.fetchGuestRoom(roomId)
  }

  componentWillUnmount() {
    this.props.resetError()
  }
  
  onSubmit = (values) => {
    const roomId = this.props.match.params.id
    if(!this.props.answerExist) { // use POST method to create new row
      if(values.fromSaveButton) { // click 'Save' button
        delete values.fromSaveButton
        this.props.saveNewAnswer(roomId, values) // POST method
      } else { // click 'Submit' button
        values.submitted_at = new Date()
        values.submitted = true
        this.props.saveNewAnswer(roomId, values)
        this.props.history.push('/guest/rooms')
      }  
    } else { // use PATCH method to update existing row
      if(values.fromSaveButton) { // click 'Save' button
        delete values.fromSaveButton
        this.props.updateAnswer(this.props.rowId, values) // PATCH method
      } else { // click 'Submit' button
        values.submitted_at = new Date()
        values.submitted = true
        this.props.updateAnswer(this.props.rowId, values)
        this.props.history.push('/guest/rooms')
      }
    }
  }

  render() {
    if(!this.props.survey) {
      return <div>Loading...</div>
    }

    const { handleSubmit } = this.props

    return (
      <div>
        <div>
          Room INFO
        </div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
    )
  }
}

function mapStateToProps(state, ownProps) {
  // ownProps.match.params.id is String type
  const room = _.find(state.guestRooms, ['id', +ownProps.match.params.id])
  if(!room) {
    return {
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
    survey,
    initialValues: {answer: answerField},
    answerExist,
    rowId
  }
}

export default connect(mapStateToProps, 
  { 
    fetchGuestRoom, saveNewAnswer, updateAnswer, fetchAnswerFromRoomId, resetError 
  })(
    reduxForm({
      form: 'answerForm',
      enableReinitialize: true
    })(GuestEditRoom)
  )