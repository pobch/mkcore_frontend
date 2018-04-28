import _ from 'lodash'
import React, {Component} from 'react'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {connect} from 'react-redux'

import {fetchOwnRoom, updateRoom} from '../actions'


class SurveyEdit extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchOwnRoom(id)
  }

  renderSurvey = ({fields}) => {
    return (
      <ul>
        <button type="button" onClick={() => fields.push({})} className="btn btn-primary">+</button>
        {
          fields.map((value,index) => {
            return (
              <li key={index}>
                <button type="button" onClick={() => fields.remove(index)} className="btn btn-danger">Delete</button>
                <Field
                  name={`${value}.question`}
                  component="input"
                  type="text"
                />

              </li>
            )
          })
        }
      </ul>
    )
  }

  onSubmit = (values) => {
    console.log('Submitted')
  }

  render() {
    if(!this.props.survey) {
      return <div>Loading...</div>
    }

    const { handleSubmit } = this.props
    const initialValues = {survey: this.props.survey}

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FieldArray name="survey" component={this.renderSurvey}/>

          <div>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
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
    survey: surveyData
  }
}

export default connect(mapStateToProps, {fetchOwnRoom, updateRoom})(
  reduxForm({
    form: 'surveyForm'
  })(SurveyEdit)
)