import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class EachAnswerViewOnly extends Component {

  state = {
    accordionOpen: true,
    accordionClass: 'show'
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    eachAnswer: PropTypes.object.isRequired
  }

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  render() {
    return (
      <li className={`list-item accordion form-minimal number ${this.state.accordionClass}`}>

        <div className="accordion-header form-group children-3 spacing-side" onClick={this.onClickToggle}>
          <label htmlFor={`survey-item-${this.props.index + 1}`}>{this.props.index + 1}</label>
          <div className="form-group-spacing">{this.props.eachAnswer.question}</div>
          <button
            type="button"
            className="plain"
          >
            <i className="twf twf-chevron-right" />
          </button>
        </div>

        <div className="accordion-body spacing-side">
          { this.props.eachAnswer.answerType === 'text'
            ? <div className="spacing-vertical">{this.props.eachAnswer.answerText}</div>
            : null
          }

          { this.props.eachAnswer.answerType === 'choices'
            ? <ul className="spacing-vertical stacked-child">
                { this.props.eachAnswer.choices.map((eachChoice, i) => {
                  return (
                    <li
                      className={eachChoice.isAnswer ? 'answer-item active' : 'answer-item'}
                      key={i}
                    >
                      {eachChoice.choiceText}
                    </li>
                  )
                })}
              </ul>
            : null
          }
        </div>
      </li>
    )
  }
}
