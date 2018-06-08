import _ from 'lodash'
import React, {Component} from 'react'
import { Field, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


export default class GuestAnswer extends Component {

  static propTypes = {
    survey: PropTypes.arrayOf(PropTypes.object),
    onClickSave: PropTypes.func
  }

  renderAnswer = ({fields}) => {
    return (
      fields.map((name, indx) => {
        return (
          <div key={indx}>
            <h4><b>{`#${indx+1} ${fields.get(indx).question}`}</b></h4>
            
            {fields.get(indx).answerType === 'text' &&
              <div className="form-group">
                Your answer :
                <Field
                  name={`${name}.answerText`}
                  component="textarea"
                  className="form-control"
                />
              </div>
            }

            {fields.get(indx).answerType === 'choices' && 
              this.props.survey[indx].choices.map((question, i) => {
                return (
                  <div key={i} className="form-check form-group">
                    <Field
                      name={`${name}.answerChoice`}
                      component="input"
                      type="radio"
                      value={question.choiceText}
                      className="form-check-input"
                    />{' '}
                  {question.choiceText}
                  </div>
                )
              })
            }
            
            <hr/>
          </div>
        )
      })
    )
  }

  render() {

    return (
      <div>

        <FieldArray
          name="answer"
          component={this.renderAnswer}
        />

        <div style={{color:'red'}}>
          <i>When you answered all questions, click 'Finish'</i>
        </div>
        
        <button type="button" onClick={this.props.onClickSave}>Save</button>
        <button type="submit" className="btn btn-primary">Finish</button>
        <Link to="/guest/rooms" className="btn btn-danger">Cancel</Link>

      </div>
    )    
  }
}
