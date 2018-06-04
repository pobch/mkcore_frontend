import React, {Component} from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

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
      <div className="wrapper">
        <div className="header">สร้างห้อง</div>
        <hr/>

        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2="แบบสอบถาม"
        />

        <form
          className="tab-content"
          onSubmit={ handleSubmit(this.onSubmit) }
        >
          <div className='tab-body'>
            <div className='tab-item'>
              <RoomInfoEdit roomCodeDisabled={false}/>
            </div>
            <div className='tab-item'>
              <SurveyEdit room={''}/>
            </div>
          </div>
          <div className="tab-footer">
            <button type="submit">Save</button>
            <Link to="/owner/rooms" className="btn btn-danger">Cancel</Link>
          </div>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            htmlId={this.saveCompleteModalHtmlId}
            onConfirm={(event) => {
              this.setState({openSaveCompleteModal: false})
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
