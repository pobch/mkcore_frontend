import _ from 'lodash'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EachAnswerViewOnly from '../components/room_view_answer2'


export default class ViewRoomAnswer extends Component {

  static propTypes = {
    survey: PropTypes.arrayOf(PropTypes.object).isRequired, // can be []
    answer: PropTypes.arrayOf(PropTypes.object).isRequired // can be []
  }

  render() {
    
    // transform this.props.answer to include other choices from this.props.survey
    // This is JOIN of 2 json
    const questions = _.keyBy(this.props.survey, 'id')
    const answersWithOtherChoices = this.props.answer.map((ans) => {
      let {choices} = questions[ans.questionId] // array of {choiceText: 'xxx'} -OR- null
      // case: array of {choiceText: 'xxx'} :
      if(choices){
        choices = choices.map((eachChoice) => {
          if(eachChoice.choiceText === ans.answerChoice) {
            return {...eachChoice, isAnswer: true}
          } else {
            return {...eachChoice, isAnswer: false}
          }
        })
      } 
      // case: null >> do nothing >> choices still === null
      
      return { ...ans, choices }
    })
    // After this, answersWithOtherChoices structure is
    // [
    //   {
    //     id: 1,
    //     questionId: 3,
    //     question: 'what is it?',
    //     answerType: 'text',
    //     answerText: 'it is a dog',
    //
    //     choices: null
    //   },
    //   {
    //     id: 2,
    //     questionId: 5,
    //     question: 'choose color',
    //     answerType: 'choices',
    //     answerChoice: 'zzz',
    //
    //     choices: [ {choiceText: 'xxx', isAnswer: false}, {choiceText:'zzz', isAnswer: true}, ... ]
    //   },
    //   {
    //     ...
    //   }
    // ]   

    // render component
    return (
      <div>
        <ul>
          { answersWithOtherChoices.map((eachAnswer, index) => {
              return (
                // Separate component for accordion :
                <EachAnswerViewOnly
                  key={index}
                  eachAnswer={eachAnswer}
                  index={index}
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

