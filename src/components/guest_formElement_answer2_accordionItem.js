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
      <li className={`accordion ${this.state.accordionClass}`}>
              
        <h4><b>{`#${this.props.indx+1} ${this.props.fields.get(this.props.indx).question}`}</b></h4>
        <button
          type="button"
          className="plain"
          onClick={this.onClickToggle}
        >
          <i className="twf twf-chevron-right" />
        </button>

        { this.props.fields.get(this.props.indx).answerType === 'text' &&
          <div className="form-group">
            Your answer :
            <Field
              name={`${this.props.name}.answerText`}
              component="textarea"
              className="form-control"
            />
          </div>
        }

        {this.props.fields.get(this.props.indx).answerType === 'choices' &&
          <ul> 
            { this.props.survey[this.props.indx].choices.map((eachChoice, i) => {
              return (
                <li key={i} className="form-check form-group">
                  <Field
                    name={`${this.props.name}.answerChoice`}
                    component="input"
                    type="radio"
                    value={eachChoice.choiceText}
                    className="form-check-input"
                  />{' '}
                  {eachChoice.choiceText}
                </li>
              )
            })}
          </ul>
        }
        
        <hr/>
      </li>
    )
  }
}