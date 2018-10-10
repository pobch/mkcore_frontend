import React, {Component} from 'react'
import {connect} from 'react-redux'

import FormProfileInfo from './profile_form_info'

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
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed spacing-side">
          บัญชีของฉัน
          <button
            type="button"
            className="float-right plain"
            onClick={() => this.setState({openConfirmLogOutModal: true})}
          >
            <i className="twf twf-sign-out" />
          </button>
        </div>
        <div className="body">
          <FormProfileInfo/>
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
