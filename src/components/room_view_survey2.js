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

  renderQuestionChoicesType = () => {
    const {choices} = this.props.eachQuestion // array of {choiceText: 'choice 1'} , ...
    return (
      <div className="accordion-body spacing-side">
        <ul className="survey-choice">
          { choices.map((eachChoice, index) => {
            return(
              <li key={index} className="form-group secondary spacing-cover anmt-fadein">
                {`${index + 1}. ${eachChoice.choiceText}`}
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
          <div className="form-group-spacing">{this.props.eachQuestion.question}</div>

          { this.props.eachQuestion.answerType === 'choices'
            ? <button
                type="button"
                className="plain"
                onClick={this.onClickToggle}
              >
                <i className="twf twf-chevron-right" />
              </button>
            : null
          }
        </div>

        { this.props.eachQuestion.answerType === 'choices'
          ? this.renderQuestionChoicesType()
          : null
        }

      </li>
    )
  }
}
