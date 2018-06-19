import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Loading from '../components/loading'

import {signUpConfirmAction} from '../actions'


class SignUpConfirm extends Component {
  
  state = {
    isLoading: true,
    error: false
  }

  async componentDidMount() {
    const {uid, token} = this.props.match.params
    try {
      await this.props.signUpConfirmAction(uid, token)
      this.setState({isLoading: false, error: false})
    } catch(error) {
      this.setState({isLoading: false, error: true})
    }
  }

  render() {
    if(this.state.isLoading) {
      return <Loading/>
    }

    if(this.state.error){
      return (
        <div>
          <div>
            Error or Invalid confirmation link
          </div>
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
      )
    }

    // no error & complete loading:
    return (
      <div>
        <div>
          Thank you for registration
        </div>
        <div>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    )
  }
}

export default connect(null, {signUpConfirmAction})(SignUpConfirm)