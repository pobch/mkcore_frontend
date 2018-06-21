import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EachQuestion from '../components/owner_formElement_survey3'


export default class RenderSurvey extends Component {

  // Warning !!!! Initializing state from props will use props when first rendering only. 
  //    When re-rendering, nextProps will not change this state.
  //    Therefore we have to make sure that this.props.currentMaxQuestionId has value at first render !!
  state = {
    newMaxQuestionId: this.props.currentMaxQuestionId + 1
  }

  // Use ref to set scroll position after move element in FieldArray which is in <EachQuestion/>
  liRef = []

  static propTypes = {
    currentMaxQuestionId: PropTypes.number.isRequired,
    fields: PropTypes.object.isRequired
  }

  render () {
    const {fields} = this.props

    // Important !! this is the initial structor of every question
    const defaultNewQuestion = {
      id: this.state.newMaxQuestionId,
      answerType: 'text',
      choices: null
    }

    return (
      <div className="survey-edit spacing-side">
        <ul className="survey-list">
          {
            fields.map((value,index) => {
              return (
                <EachQuestion
                  key={fields.get(index).id}

                  liRef={(node) => this.liRef[index] = node}
                  index={index}
                  arrayLength={fields.length}
                  value={value} 
                  answerType={fields.get(index).answerType}

                  onClickDelete={() => {fields.remove(index)}}

                  onClickAddNewQuestionWithCloneChoices={() => {
                    fields.push({ 
                      ...defaultNewQuestion, 
                      answerType: fields.get(index).answerType, 
                      choices: fields.get(index).choices
                    })
                    this.setState(prevState => {
                      return { newMaxQuestionId: prevState.newMaxQuestionId + 1 }
                    })
                    // Move to last
                    this.liRef[fields.length-1].scrollIntoView()
                  }}

                  moveToNewIndex={(newIndex) => {
                    fields.move(index, newIndex)
                    // Move to new position
                    this.liRef[newIndex].scrollIntoView()
                  }}

                  onClickText={() => {
                    const wantedValue = {...fields.get(index), answerType:'text', choices:null}
                    fields.remove(index)
                    fields.insert(index, wantedValue)
                  }}

                  onClickChoices={() => {
                    // initial with 1 choice:
                    const wantedValue = {...fields.get(index), answerType: 'choices', choices:[{}]}
                    fields.remove(index)
                    fields.insert(index, wantedValue)
                  }}
                />
              )
            })
          }
        </ul>
        <button type="button"
          onClick={() => {
            fields.push(defaultNewQuestion)
            this.setState(prevState => {
              return { newMaxQuestionId: prevState.newMaxQuestionId + 1 }
            })
          }}
          className="full large brand-basic"
        >
          <i className="twf twf-minimal-plus before" />
          เพิ่มคำถาม
        </button>
      </div>
    )
  }
}
