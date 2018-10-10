import React, { Component } from 'react'
import { connect } from 'react-redux'

import { onLeaveLogInPage, resetError } from '../actions'
import icon from '../static/logo.png'
import { facebook } from '../utilities';

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const FACEBOOK_REDIRECT_URI = process.env.REACT_APP_FACEBOOK_REDIRECT_URI;

class LogIn extends Component {
  componentWillUnmount(){
    // remove error msg (if any) when leaving this page
    this.props.onLeaveLogInPage()
    this.props.resetError()
  }

  handleClick = () => {
    facebook.connect(FACEBOOK_APP_ID, FACEBOOK_REDIRECT_URI);
  }

  render() {
    const { error, authenticated } = this.props.auth

    return (
      <div className="login">
        <div className="wrapper-background fixed brand-bg" />
        <div className="login-header align-center">
          <img src={icon} width="184" height="37" alt="Logo"/>
        </div>
        <div className={ error ? 'feedback invalid' : 'feedback success' }>
          { error ? error : (authenticated ? 'Log in successfully' : '') }
        </div>
        <button className="facebook large full" type="button" onClick={this.handleClick}>
          <i className="twf twf-facebook-square" />
          Login ด้วย facebook
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { onLeaveLogInPage, resetError })(LogIn)
