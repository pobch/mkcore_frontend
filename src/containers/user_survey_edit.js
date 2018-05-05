import _ from 'lodash'
import React, {Component} from 'react'
import {reduxForm, FieldArray} from 'redux-form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchOwnRoom, updateRoom} from '../actions'
import RenderSurvey from '../components/user_survey_edit_render'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'


class SurveyEdit extends Component {
  state = {
    showSaveCompleteModal: false
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchOwnRoom(id)
  }
  
  onSubmit = (values) => {
    // console.log('Submitted values ===', values)
    const { id } = this.props.match.params
    this.props.updateRoom(id, values)
    this.setState({showSaveCompleteModal: true})
  }

  findInitialPropsToPass = () => {
    let currentMaxId = 0, currentChoiceQuestionId = {}, currentTextQuestionId = {}
    this.props.room.survey.forEach(value => {
      if(+value.id > currentMaxId) currentMaxId = +value.id
      if(value.answerType === 'text') currentTextQuestionId[value.id] = value.id
      if(value.answerType === 'choices') currentChoiceQuestionId[value.id] = value.id
    })
    return {currentMaxId, currentChoiceQuestionId, currentTextQuestionId}
  }

  render() {
    if(!this.props.room.survey) {
      return <div>Loading...</div>
    }
    
    const { handleSubmit } = this.props
    // console.log('render count : ', 1)
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FieldArray 
            name="survey" 
            component={RenderSurvey} 
            props={{
              change: this.props.change, 
              initMaxId: this.findInitialPropsToPass().currentMaxId,
              initChoiceQuestionId: this.findInitialPropsToPass().currentChoiceQuestionId,
              initTextQuestionId: this.findInitialPropsToPass().currentTextQuestionId
            }}
          />

          <div>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to={`/user/rooms/${this.props.match.params.id}`} className="btn btn-danger">Cancel</Link>
          </div>
        </form>

        { this.state.showSaveCompleteModal && (
          <Portal>
            <SaveCompleteModal
              onConfirm={(event) => {
                this.setState({showSaveCompleteModal: false})
              }}
            />
          </Portal>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const roomData = _.keyBy(state.ownRooms, 'id')[ownProps.match.params.id]
  // case 'survey===null', then assign 'surveyData=[]'
  // case there is truthy data in 'survey', then assign 'surveyData=survey'
  const surveyData = roomData && (roomData.survey || [])
  return {
    room: {survey: surveyData},  
    initialValues: {survey: surveyData}
    // need another prop other than 'initialValues' bcoz if there is only 'initialValues' prop, 
    // 'enableReinitialize' will intervene it (i.e., makes 'initialValues' not change its values 
    // even a global state has changed)
  }
}

export default connect(mapStateToProps, {fetchOwnRoom, updateRoom})(
  reduxForm({
    form: 'surveyForm',
    enableReinitialize: true // make all <Field /> can receive initialValues more than once
  })(SurveyEdit)
)