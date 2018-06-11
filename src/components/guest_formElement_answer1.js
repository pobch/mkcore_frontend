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
      <ul className="survey-list spacing-side">
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
        <div className="navbar fixed clearfix spacing-cover primary-bg">
          <button type="button" className="float-left" onClick={this.props.onClickSave}>บันทึก</button>
          <button type="submit" className="float-right">ส่งคำตอบ</button>
        </div>
      </div>
    )
  }
}
