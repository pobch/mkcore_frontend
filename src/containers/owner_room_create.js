import React, {Component} from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import TopTabBar from '../components/topTabBar'
import RoomInfoEdit from '../components/owner_formElement_roomInfo'
import SurveyEdit from '../components/owner_formElement_survey1'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import { createRoom } from '../actions'

import { validateOwnRoomCreateEdit } from '../form_validators'


class CreateRoom extends Component {

  state = {
    openSaveCompleteModal: false
  }

  onSubmit = async (values) => {
    try {
      await this.props.createRoom(values)
      this.setState({openSaveCompleteModal: true})
    } catch(error) {
      // console.log('err', error)
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>

        <h5>Create room</h5>
        <hr/>

        <TopTabBar 
          titleTab1="Info"
          titleTab2="Create Survey"
        />

        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <div className='content-tab1'>
            <RoomInfoEdit roomCodeDisabled={false}/>
          </div>
          <div className='content-tab2'>
            <SurveyEdit room={''}/>
          </div>  
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            htmlId={this.saveCompleteModalHtmlId}
            onConfirm={(event) => {
              this.setState({showSaveCompleteModal: false})
            }}
          />
        </Portal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, { createRoom })(
  reduxForm({
    form: 'createRoomForm',
    validate: validateOwnRoomCreateEdit
  })(CreateRoom))
