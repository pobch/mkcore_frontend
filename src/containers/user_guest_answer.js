import _ from 'lodash'
import React, {Component} from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'

import { fetchGuestRoom } from '../actions'


class GuestAnswer extends Component {
  componentDidMount() {
    this.props.fetchGuestRoom(this.props.match.params.id)
  }
  
  onSubmit = (values) => {
    console.log('submit ===', values)
  }

  renderAnswer = ({fields}) => {
    return (
      fields.map((name, indx) => {
        return (
          <div key={indx}>
            <h4><b>{fields.get(indx).question}</b></h4>
            
            {fields.get(indx).answerType === 'text' &&
              <div>
                Your answer :
                <Field
                  name={`${name}.answerText`}
                  component="input"
                  type="text"
                />
              </div>
            }

            {fields.get(indx).answerType === 'choices' &&
              this.props.survey[indx].choices.map((value, i) => {
                return (
                  <div key={i}>
                    <Field
                      name={`${name}.answerChoice`}
                      component="input"
                      type="radio"
                      value={value.choiceText}
                    />{' '}
                    {value.choiceText}
                  </div>
                )
              })
            }

          </div>
        )
      })
    )
  }

  render() {
    const { handleSubmit } = this.props
    console.log('InitValues ===',this.props.initialValues)
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        
        <FieldArray
          name="answer"
          component={this.renderAnswer}
        />
        
        <button type="submit">Answer</button>
      </form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(typeof ownProps.match.params.id) // String type
  const room = _.find(state.guestRooms, ['id', +ownProps.match.params.id])
  
  // Not every room has survey. Some rooms have survey=null
  if(!room || _.isEmpty(room.survey)) { // _.isEmpty for [],{},null,undefined will return true
    return {
      survey: null
    }
  }
  
  // case: there is at least 1 question
  // build initialValues
  const {survey} = room
  const answer = []
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
  return {
    survey,
    initialValues: {answer}
  }
}

export default connect(mapStateToProps, { fetchGuestRoom })(
  reduxForm({
    form: 'answerForm'
    // enableReinitialize: true
  })(GuestAnswer)
)