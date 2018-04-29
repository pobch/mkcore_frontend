import _ from 'lodash'
import React, {Component} from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {connect} from 'react-redux'

import {fetchOwnRoom, updateRoom} from '../actions'

// survey structure:
// {
//   survey: [
//     {
//       id: 1 
//       question: 'what is it?',
//       answerType: 'text'
//       choices: null
//     },
//     {
//       id: 5
//       question: 'choose color',
//       answerType: 'choices',
//       choices: ['red', 'blue', 'green']
//     }
//   ]
// }

class RenderSurvey extends Component {
  state = {
    showChoiceFieldId: {},
    showTextFieldId: {},
    maxQuestionId: this.props.maxId
  }

  renderQuestionField = (field) => {
    return (
      <div>
        <label>Enter the question</label>
        <input type="text" {...field.input}/>
      </div>
    )
  }

  renderChoiceField = ({fields}) => {
    return (
      <ul>
        <button type="button"
          className="btn btn-primary"
          onClick={() => {
            fields.push({})
          }}>
          +Choice
        </button>
        {
          fields.map((value, index) => {
            return (
              <li key={index}>
                <label>{`Choice #${index + 1} : `}</label>
                <Field
                  name={`${value}.choiceText`}
                  component="input"
                  type="text"
                />
              </li>
            )
          })
        }
      </ul>
    )
  }

  render () {
    const {fields, change} = this.props
    const defaultNewQuestion = {
      id: this.state.maxQuestionId + 1,
      answerType: 'text',
      choices: null
    }

    return (
      <ul>
        <button type="button" 
          onClick={() => {
            const {id} = defaultNewQuestion
            fields.push(defaultNewQuestion)
            this.setState({
              maxQuestionId: this.state.maxQuestionId + 1,
              showTextFieldId: {...this.state.showTextFieldId, [id]: id}
            })
          }} 
          className="btn btn-primary">
          +
        </button>
        {
          fields.map((value,index) => {
            const {id} = fields.get(index)
            return (
              <li key={index}>
                
                <button type="button" 
                  onClick={() => {
                    this.setState({
                      showChoiceFieldId: _.omit(this.state.showChoiceFieldId, id),
                      showTextFieldId: _.omit(this.state.showTextFieldId, id)
                    })
                    fields.remove(index)
                  }} 
                  className="btn btn-danger">
                  Delete
                </button>

                <div>
                  Answer Type : 
                  <button type="button" 
                    onClick={() => {
                      const wantedValue = {...fields.get(index), answerType:'text', choices:null}
                      fields.remove(index)
                      fields.insert(index, wantedValue)
                      // change(`${value}.answerType`, 'text') 
                      // change(`${value}.choices`, null)       // These 2 lines are alternative to 3 lines above
                      this.setState({
                        showChoiceFieldId: _.omit(this.state.showChoiceFieldId, id),
                        showTextFieldId: {...this.state.showTextFieldId, [id]: id}
                      })
                    }}>
                    Text
                  </button>

                  <button type="button" 
                    onClick={() => {
                      const wantedValue = {...fields.get(index), answerType: 'choices'}
                      fields.remove(index)
                      fields.insert(index, wantedValue)
                      this.setState({
                        showChoiceFieldId: {...this.state.showChoiceFieldId, [id]: id},
                        showTextFieldId: _.omit(this.state.showTextFieldId, id)
                      })
                    }}>
                    Choices
                  </button>
                </div>

                <Field
                  name={`${value}.question`}
                  component={this.renderQuestionField}
                />
                <div>
                  Expected answer : 
                  {_.includes(this.state.showTextFieldId, id) && ' Text Type'}
                  {_.includes(this.state.showChoiceFieldId, id) && ' Choice Type'}
                </div>
                
                {_.includes(this.state.showChoiceFieldId, id) && 
                  <FieldArray
                    name={`${value}.choices`}
                    component={this.renderChoiceField}
                  />
                }
                
              </li>
            )
          })
        }
      </ul>
    )
  }
}

class SurveyEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchOwnRoom(id)
  }
  
  onSubmit = (values) => {
    console.log('Submitted values ===', values)
  }

  findInitialMaxQuestionId = () => {
    let currentMaxId = 0
    this.props.room.survey.forEach(value => {
      if(+value.id > currentMaxId) currentMaxId = +value.id
    })
    return currentMaxId
  }

  render() {
    if(!this.props.room.survey) {
      return <div>Loading...</div>
    }
    
    const { handleSubmit } = this.props
    console.log('render count : ', 1)
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FieldArray 
            name="survey" 
            component={RenderSurvey} 
            props={{change: this.props.change, maxId: this.findInitialMaxQuestionId()}}
          />

          <div>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const roomData = _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id]
  // case 'survey===null', then assign 'surveyData=[]'
  // case there is truthy data in 'survey', then assign 'surveyData=survey'
  const surveyData = roomData && (roomData.survey || [])
  return {
    room: {survey: surveyData}, // need another prop bcoz if there is only 'initialValues' prop, 
                                // 'enableReinitialize' will intervene it
    initialValues: {survey: surveyData}
  }
}

export default connect(mapStateToProps, {fetchOwnRoom, updateRoom})(
  reduxForm({
    form: 'surveyForm',
    enableReinitialize: true
  })(SurveyEdit)
)