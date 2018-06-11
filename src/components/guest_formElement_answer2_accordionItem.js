import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'


export default class EachAnswer extends Component {

  state = {
    accordionOpen: true,
    accordionClass: 'show'
  }

  static propTypes = {
    survey: PropTypes.arrayOf(PropTypes.object).isRequired,
    fields: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    indx: PropTypes.number.isRequired
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
      <li className={`list-item accordion pointer ${this.state.accordionClass}`}>
        <div className="accordion-header form-group children-3 spacing-side" onClick={this.onClickToggle}>
          <label>{this.props.indx+1}</label>
          <div className="form-group-spacing">{this.props.fields.get(this.props.indx).question}</div>
          <button
            type="button"
            className="plain"
          >
            <i className="twf twf-chevron-right" />
          </button>
        </div>

        { this.props.fields.get(this.props.indx).answerType === 'text' &&
          <div className="form-group accordion-body no-spacing">
            <Field
              name={`${this.props.name}.answerText`}
              component="textarea"
              className="form-control"
              placeholder="ใส่คำตอบที่นี่"
            />
          </div>
        }

        {this.props.fields.get(this.props.indx).answerType === 'choices' &&
          <div className="accordion-body no-spacing spacing-side">
            { this.props.survey[this.props.indx].choices.map((eachChoice, i) => {
              return (
                <label key={i} htmlFor={`q${this.props.indx}a${i}`} className="radio-set">
                  <span className="radio-text">{eachChoice.choiceText}</span>
                  <Field
                    id={`q${this.props.indx}a${i}`}
                    name={`${this.props.name}.answerChoice`}
                    component="input"
                    type="radio"
                    value={eachChoice.choiceText}
                    className="form-check-input"
                  />
                  <span className="radio-check"></span>
                </label>
              )
            })}
          </div>
        }
      </li>
    )
  }
}
