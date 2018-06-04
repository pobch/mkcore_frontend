import React, {Component} from 'react'

import EachQuestion from '../containers/owner_formElement_survey3'


export default class RenderSurvey extends Component {

  render () {
    const {fields} = this.props
    const defaultNewQuestion = {
      answerType: 'text',
      choices: null
    }

    return (
      <ul>
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

        <button type="button" 
          onClick={() => {
            fields.push(defaultNewQuestion)
          }} 
          className="btn btn-primary"
        >+Question
        </button>
        
        <hr/>

      </ul>
    )
  }
}