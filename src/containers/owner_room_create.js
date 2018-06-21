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
    if(!values.survey) {
      values.survey = []
    }
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
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">สร้างห้อง</div>
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
              <SurveyEdit currentMaxQuestionId={0}/>
            </div>
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/owner/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
            <button type="submit" className="float-right">
              บันทึก
            </button>
          </div>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            onConfirm={() => {
              this.props.history.push('/owner/rooms')
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
