import React, {Component} from 'react'
import { FieldArray} from 'redux-form'
import PropTypes from 'prop-types'

import RenderSurvey from '../components/owner_formElement_survey2'


export default class SurveyEdit extends Component {

  static propTypes = {
    currentMaxQuestionId: PropTypes.number.isRequired
  }

  render() {
    return (
      <FieldArray
        name="survey"
        component={RenderSurvey}
        rerenderOnEveryChange={true} // Warning !!! Performance will be reduced by setting this props to true 
                                      // because the component will re-render after every change of 'Field' 
                                      // inside this 'FieldArray'. 
                                      // By the way, I need to set this props to FORCE this component to be 
                                      // re-rendered when using 'fields.insert()' inside this component.
        props={{
          currentMaxQuestionId: this.props.currentMaxQuestionId
        }}
      />
    )
  }
}
