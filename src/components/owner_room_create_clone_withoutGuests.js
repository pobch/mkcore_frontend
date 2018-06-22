import React, {Component} from 'react'
import PropTypes from 'prop-types'

import CreateRoom from '../containers/owner_room_create'


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
    const { title, description, instructor_name, survey } = this.props.location.state.oldRoom
    return {
      title: `[CLONED] ${title}`,
      description: `[CLONED] ${description}`,
      instructor_name: `[CLONED] ${instructor_name}`,
      survey
    } 
  }

  render() {
    return (
      <CreateRoom
        initialValues={this.createInitialValuesToPass()}
      />
    )
  }
}
