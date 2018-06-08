import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class EachQuestionViewOnly extends Component {

  state = {
    accordionOpen: true,
    accordionClass: 'show'
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    eachQuestion: PropTypes.object.isRequired
  }

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  renderQuestionTextType = () => {
    return (
      <div>
        Enter the answer:
        <input type="text" disabled/>
      </div>
    )
  }

  renderQuestionChoicesType = () => {
    const {choices} = this.props.eachQuestion // array of {choiceText: 'choice 1'} , ...
    return (
      <div>
        <ul>
          { choices.map((eachChoice, indx) => {
            return(
              <li key={indx}>
                {`${indx + 1} - ${eachChoice.choiceText}`}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <li className={`list-item accordion form-minimal number ${this.state.accordionClass}`}>
        <div className="accordion-header form-group children-3 spacing-side">
          <label htmlFor={`survey-item-${this.props.index + 1}`}>{this.props.index + 1}</label>
          <span>{this.props.eachQuestion.question}</span>
          <div className="inline-child">
            <button
              type="button"
              className="plain"
              onClick={this.onClickToggle}
            >
              <i className="twf twf-chevron-right" />
            </button>
          </div>
        </div>

        <div className="accordion-body spacing-side">
          { this.props.eachQuestion.answerType === 'text'
            ? this.renderQuestionTextType()
            : null 
          }
          { this.props.eachQuestion.answerType === 'choices'
            ? this.renderQuestionChoicesType()
            : null
          }
        </div>

      </li>
    )
  }
}
