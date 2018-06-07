import React, {Component} from 'react'
import {connect} from 'react-redux'

import FormProfileInfo from './profile_form_info'
import FormProfilePassword from './profile_form_password'

import TopTabBar from '../components/topTabBar'
import BotNavbar from '../components/botNavbar'
import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import {fetchProfile, logOutAction} from '../actions'

class Profile extends Component {

  state = {
    openConfirmLogOutModal: false
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchProfile()
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed custom-bg" />
        <div className="header fixed">บัญชีของฉัน</div>
        <TopTabBar
          titleTab1="ทั่วไป"
          titleTab2="รหัสผ่าน"
        />
        <div className="tab-content form-minimal">
          <div className="tab-body">
            <div className='tab-item spacing-side'>
              <FormProfileInfo/>
            </div>
            <div className='tab-item spacing-side'>
              <FormProfilePassword/>
            </div>
          </div>
        </div>
        <div className="tab-footer fixed clearfix spacing-side">
          <button type="button" 
            className="float-right"
            onClick={() => this.setState({openConfirmLogOutModal: true})}
          ><i className="twf twf-sign-out" />
          </button>
        </div>
        <BotNavbar/>

        <Portal>
          <ConfirmModal
            className={this.state.openConfirmLogOutModal ? 'show' : 'hide'}
            modalBody="คุณต้องการออกจากระบบ?"
            onCancel={ () => this.setState({openConfirmLogOutModal: false})}
            onConfirm={ () => {
              this.props.logOutAction(() => {this.props.history.push('/')})
            }}
          />
        </Portal>

      </div>
    )
  }
}

export default connect(null, {fetchProfile, logOutAction})(Profile)