import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EachQuestion from '../containers/owner_formElement_survey3'


export default class RenderSurvey extends Component {

  static propTypes = {
    roomId: PropTypes.string,
    fields: PropTypes.object.isRequired
  }

  render () {
    const {fields} = this.props
    const defaultNewQuestion = {
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
                  key={index}
                  roomId={this.props.roomId}
                  onClickDelete={() => {fields.remove(index)}}
                  index={index}
                  value={value}
                  onClickText={() => {
                    const wantedValue = {...fields.get(index), answerType:'text', choices:null}
                    fields.remove(index)
                    fields.insert(index, wantedValue)
                  }}
                  onClickChoices={() => {
                    const wantedValue = {...fields.get(index), answerType: 'choices'}
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
