import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EachQuestionViewOnly from '../components/room_view_survey2'


export default class ViewRoomSurvey extends Component {
  
  static propTypes = {
    room: PropTypes.shape({
      survey: PropTypes.array.isRequired
    }).isRequired
  }

  render() {
    const {survey} = this.props.room // array type
    return (
      <ul>
        {survey.map((eachQuestion, indx) => {
          return (
            <EachQuestionViewOnly
              key={indx}
              index={indx}
              eachQuestion={eachQuestion}
            />
          )
        })}
      </ul>
    )
  }
}