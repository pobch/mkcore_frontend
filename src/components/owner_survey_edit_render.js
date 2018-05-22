import _ from 'lodash'
import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'


export default class RenderSurvey extends Component {
  state = {
    showChoiceFieldId: this.props.initChoiceQuestionId, // object
    showTextFieldId: this.props.initTextQuestionId, // object 
    maxQuestionId: this.props.initMaxId // integer
  }

  renderQuestionField = (field) => {
    return (
      <div className="form-group">
        <label>Enter the question</label>
        <input type="text" {...field.input} className="form-control"/>
      </div>
    )
  }

  renderChoiceField = ({fields}) => {
    return (
      <ul>
        <button type="button"
          className="btn btn-outline-primary mb-1 btn-sm"
          onClick={() => {
            fields.push({})
          }}>
          +Choice
        </button>
        {
          fields.map((value, index) => {
            return (
              <li key={index} className="form-inline">
                <button type="button" 
                  onClick={() => fields.remove(index)}
                  className="btn btn-outline-danger mb-1 btn-sm">
                  -
                </button>
                <label>{`Choice #${index + 1} : `}</label>
                <Field
                  name={`${value}.choiceText`}
                  component="input"
                  type="text"
                  className="form-control"
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
            this.setState((prevState) => ({
              maxQuestionId: prevState.maxQuestionId + 1,
              showTextFieldId: {...prevState.showTextFieldId, [id]: id}
            }))
          }} 
          className="btn btn-primary">
          +Question
        </button>
        <hr/>
        {
          fields.map((value,index) => {
            const {id} = fields.get(index)
            return (
              <li key={index} className="form-group">
                <button type="button" 
                  onClick={() => {
                    this.setState((prevState) => ({
                      showChoiceFieldId: _.omit(prevState.showChoiceFieldId, id),
                      showTextFieldId: _.omit(prevState.showTextFieldId, id)
                    }))
                    fields.remove(index)
                  }} 
                  className="btn btn-danger mx-1 btn-sm">
                Delete
                </button>
                <b>{`Question #${index+1}`}</b>

                <div className="form-group form-inline">
                  Answer Type : 
                  <button type="button" className="btn btn-outline-info m-1 btn-sm"
                    onClick={() => {
                      const wantedValue = {...fields.get(index), answerType:'text', choices:null}
                      fields.remove(index)
                      fields.insert(index, wantedValue)
                      // change(`${value}.answerType`, 'text') 
                      // change(`${value}.choices`, null)       // These 2 lines are alternative to 3 lines above
                      this.setState((prevState) => ({
                        showChoiceFieldId: _.omit(prevState.showChoiceFieldId, id),
                        showTextFieldId: {...prevState.showTextFieldId, [id]: id}
                      }))
                    }}>
                    Text
                  </button>

                  <button type="button" className="btn btn-outline-info m-1 btn-sm"
                    onClick={() => {
                      const wantedValue = {...fields.get(index), answerType: 'choices'}
                      fields.remove(index)
                      fields.insert(index, wantedValue)
                      this.setState((prevState) => ({
                        showChoiceFieldId: {...prevState.showChoiceFieldId, [id]: id},
                        showTextFieldId: _.omit(prevState.showTextFieldId, id)
                      }))
                    }}>
                    Choices
                  </button>
                </div>

                <Field
                  name={`${value}.question`}
                  component={this.renderQuestionField}
                />
                <div className="form-group">
                  Expected answer :
                  <i> 
                    {_.includes(this.state.showTextFieldId, id) && ' Text Type'}
                    {_.includes(this.state.showChoiceFieldId, id) && ' Choice Type'}
                  </i>
                </div>
                
                {_.includes(this.state.showChoiceFieldId, id) && 
                  <FieldArray
                    name={`${value}.choices`}
                    component={this.renderChoiceField}
                  />
                }
                
                <hr/>
              </li>
            )
          })
        }
      </ul>
    )
  }
}