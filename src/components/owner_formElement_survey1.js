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
        props={{
          currentMaxQuestionId: this.props.currentMaxQuestionId
        }}
      />
    )
  }
}

// function mapStateToProps(state, ownProps) {
//   const roomData = _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id]
//   // case 'survey===null', then assign 'surveyData=[]'
//   // case there is truthy data in 'survey', then assign 'surveyData=survey'
//   const surveyData = roomData && (roomData.survey || [])
//   return {
//     room: {survey: surveyData},
//     initialValues: {survey: surveyData}
//     // need another prop other than 'initialValues' bcoz if there is only 'initialValues' prop,
//     // 'enableReinitialize' will intervene it (i.e., makes 'initialValues' not change its values
//     // even a global state has changed)
//   }
// }

// export default connect(mapStateToProps, {fetchOwnRoom, updateRoom})(
//   reduxForm({
//     form: 'surveyForm',
//     enableReinitialize: true // make all <Field /> can receive initialValues more than once
//   })(SurveyEdit)
// )
