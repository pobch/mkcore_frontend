import React, {Component} from 'react'
import { FieldArray} from 'redux-form'
import {Link} from 'react-router-dom'

import RenderSurvey from '../components/owner_formElement_survey2'


export default class SurveyEdit extends Component {

  render() {
    return (
      <div>
        <FieldArray 
          name="survey" 
          component={RenderSurvey} 
          props={{
            roomId: this.props.roomId
          }}
        />

        <div>
          <button type="submit">Save</button>
          <Link to="/owner/rooms" className="btn btn-danger">Cancel</Link>
        </div>
      </div>
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