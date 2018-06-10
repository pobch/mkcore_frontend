import React, {Component} from 'react'
import { FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import EachAnswer from '../components/guest_formElement_answer2_accordionItem'


export default class GuestAnswer extends Component {

  static propTypes = {
    survey: PropTypes.arrayOf(PropTypes.object),
    onClickSave: PropTypes.func
  }

  renderAnswer = ({fields}) => {
    return (
      <ul>
        { fields.map((name, indx) => {
          return (
            <EachAnswer key={indx}
              survey={this.props.survey}
              fields={fields}
              name={name}
              indx={indx}
            />
          )
        })}
      </ul>
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
