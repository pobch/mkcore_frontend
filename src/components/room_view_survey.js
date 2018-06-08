import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class ViewRoomSurvey extends Component {
  
  static propTypes = {
    room: PropTypes.shape({
      survey: PropTypes.array.isRequired
    }).isRequired
  }

  renderQuestionTextType = (indx) => {
    const {survey} = this.props.room
    return
  }

  renderQuestionChoicesType = (indx) => {
    const {survey} = this.props.room
    return
  }

  render() {
    const {survey} = this.props.room // array type
    return (
      <div>
        {survey.map((eachQuestion, indx) => {
          return (
            <div key={indx}>TEST</div>
          )
          // if(eachQuestion.answerType === 'text'){
          //   return this.renderQuestionTextType()
          // }
          // if(eachQuestion.answerType === 'choices'){
          //   return this.renderQuestionChoicesType()
          // }
        })}
      </div>
    )
  }
}