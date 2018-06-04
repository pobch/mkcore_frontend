import _ from 'lodash'
import React, {Component} from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchGuestRoom, submitAnswer, fetchAnswer, resetError } from '../actions'


class GuestAnswer extends Component {

  renderAnswer = ({fields}) => {
    return (
      fields.map((name, indx) => {
        return (
          <div key={indx}>
            <h4><b>{`#${indx+1} ${fields.get(indx).question}`}</b></h4>
            
            {fields.get(indx).answerType === 'text' &&
              <div className="form-group">
                Your answer :
                <Field
                  name={`${name}.answerText`}
                  component="textarea"
                  className="form-control"
                />
              </div>
            }

            {fields.get(indx).answerType === 'choices' && 
              this.props.survey[indx].choices.map((question, i) => {
                return (
                  <div key={i} className="form-check form-group">
                    <Field
                      name={`${name}.answerChoice`}
                      component="input"
                      type="radio"
                      value={question.choiceText}
                      className="form-check-input"
                    />{' '}
                  {question.choiceText}
                  </div>
                )
              })
            }
            
            <hr/>
          </div>
        )
      })
    )
  }

  render() {
    // case: guest has not answered the survey yet
    if(this.props.canEditAnswer) {
      const { handleSubmit } = this.props
      return (
        <form onSubmit={handleSubmit(this.onSubmit)}>

          <FieldArray
            name="answer"
            component={this.renderAnswer}
          />
 
          <div style={{color:'red'}}>
            <i>You can submit the answers only once</i>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/guest/rooms" className="btn btn-danger">Cancel</Link>

        </form>
      )
    }

    // case: guest already answered the survey
    return (
      <div>
        { this.props.initialValues && this.props.initialValues.answer && 
          this.props.initialValues.answer.map((ans, indx) => {
            return (
              <div key={indx}>
                <h4><b>{`#${indx+1} ${ans.question}`}</b></h4>
                <div style={{color: 'grey'}}>
                  <i>Your Answer:</i> <b>{ans.answerText || ans.answerChoice}</b>
                </div>
                <hr/>
              </div>
            )
          })
        }
        <div style={{color:'red'}}>
          <i>You have already answered this survey 
            -OR- There is no survey created in this room</i>
        </div>
        <Link to="/guest/rooms" className="btn btn-danger">Cancel</Link>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  let canEditAnswer = false
  // ownProps.match.params.id is String type
  const room = _.find(state.guestRooms, ['id', +ownProps.match.params.id])
  
  // Not every room has survey. Some rooms have survey=null
  if(!room || _.isEmpty(room.survey)) { // _.isEmpty for [],{},null,undefined will return true
    return {
      survey: null,
      canEditAnswer
    }
  }
  
  // build initialValues
  const {survey} = room
  const existAnswer = _.find(state.answers, ['room', +ownProps.match.params.id])
  let answer = []
  if(existAnswer) { // case: the guest has already answered the survey before.
    answer = existAnswer.answer
    canEditAnswer = false  
  } else { // case: there is at least 1 question and the guest has never answered the survey yet
    survey.forEach((eachQuestion, indx) => {
      const eachAnswer = {
        id: indx + 1,
        questionId: eachQuestion.id,
        question: eachQuestion.question,
        answerType: eachQuestion.answerType
      }
      // no initialValues for 'answerText' and 'answerChoice'
      answer.push(eachAnswer)
    })
    canEditAnswer = true
  }
  return {
    survey,
    canEditAnswer,
    initialValues: {answer}
  }
}

export default connect(mapStateToProps, { fetchGuestRoom, submitAnswer, fetchAnswer, resetError })(
  reduxForm({
    form: 'answerForm',
    enableReinitialize: true
  })(GuestAnswer)
)