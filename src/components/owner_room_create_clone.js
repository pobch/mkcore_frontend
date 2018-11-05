import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import CreateRoom from '../containers/owner_room_create'
const CreateRoomWithRouter = withRouter(CreateRoom)

export default class CreateRoomCloneWithoutGuests extends Component {
  static propTypes = {
    // props from <Link/> pattern: this.props.location.state.PROPSNAME
    location: PropTypes.shape({
      state: PropTypes.shape({
        oldRoom: PropTypes.object.isRequired
      })
    }).isRequired
  }

  createInitialValuesToPass = () => {
    // exclude "guests": [1,5,9,...]
    const { title, description, instructor_name, survey, attached_links } = this.props.location.state.oldRoom
    return {
      title: `${title}`,
      description: `${description}`,
      instructor_name: `${instructor_name}`,
      survey,
      attached_links
    }
  }

  render() {
    return (
      <CreateRoomWithRouter
        initialValues={this.createInitialValuesToPass()}
      />
    )
  }
}
