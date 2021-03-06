import React, {Component} from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import TopTabBar from '../components/topTabBar'
import RoomInfoEdit from '../components/owner_formElement_roomInfo'
import AttachLinks from '../components/owner_formElement_attachLinks'
import SurveyEdit from '../components/owner_formElement_survey1'
import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'
import ErrorMessage from '../components/error_message'

import { createRoom } from '../actions'

import { validateOwnRoomCreateEdit } from '../form_validators'


class CreateRoom extends Component {

  state = {
    openSaveCompleteModal: false
  }

  static propTypes = {
    // receive from parent component (if any):
    initialValues: PropTypes.object,
    currentMaxQuestionId: PropTypes.number
  }

  componentDidMount() {
    window.scrollTo(0,0)
  }

  onSubmit = async (values) => {
    if(!values.survey) {
      values.survey = []
    }
    try {
      await this.props.createRoom(values)
      this.setState({openSaveCompleteModal: true})
    } catch(error) {
      console.error('There is an error when creating room')
    }
  }

  render() {
    const { handleSubmit, currentMaxQuestionId } = this.props
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">สร้างห้อง</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2="ไฟล์แนบ"
          titleTab3="แบบสอบถาม"
        />
        <form
          className="tab-content"
          onSubmit={ handleSubmit(this.onSubmit) }
        >
          <div className='tab-body'>
            <div className='tab-item'>
              <RoomInfoEdit roomCodeDisabled={false}/>
            </div>
            <div className="tab-item">
              <AttachLinks/>
            </div>
            <div className='tab-item'>
              <SurveyEdit currentMaxQuestionId={currentMaxQuestionId || 0}/>
            </div>
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/owner/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
            <button type="submit" className="float-right plain">
              บันทึก
            </button>
          </div>
        </form>

        { this.props.errors.ownRoomsError &&
          <ErrorMessage errors={this.props.errors.ownRoomsError} />
        }

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
