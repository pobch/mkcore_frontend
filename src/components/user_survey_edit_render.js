import _ from 'lodash'
import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'


export default class RenderSurvey extends Component {
  state = {
    showChoiceFieldId: this.props.initChoiceQuestionId,
    showTextFieldId: this.props.initTextQuestionId,
    maxQuestionId: this.props.initMaxId
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
                <button type="button" onClick={() => fields.remove(index)}>-</button>
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