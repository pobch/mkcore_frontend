import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import LogIn from '../containers/login'
import AuthFacebook from '../containers/auth_facebook'
import SignUp from '../containers/signup'
import SignUpConfirm from '../containers/signup_confirm'
import PasswordForgot from '../containers/password_forgot'
import PasswordForgotConfirm from '../containers/password_forgot_confirm'
import GuestRoomsList from '../containers/guest_rooms_list'
import OwnerRoomsList from '../containers/owner_rooms_list'
import DraftRoom from '../containers/owner_room_draft'
import GuestRoomAnswerNotSubmit from '../containers/guest_room_answerNotSubmit'
import GuestRoomAnswerSubmitted from '../containers/guest_room_answerSubmitted'
import ViewJoinReqs from '../containers/owner_room_join_reqs'
import Profile from '../containers/profile'
import CreateRoom from '../containers/owner_room_create'
import PublishedRoom from '../containers/owner_room_published'

import onlyUserCanAccess from '../hoc/only_user_can_access'
import onlyAnonCanAccess from '../hoc/only_anon_can_access'

import SignUpAfterSubmit from '../components/signup_after_submit'
import CreateRoomCloneWithoutGuests from '../components/owner_room_create_clone'
import NotFound from '../components/notfound'

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter basename="/app">
          <Switch>
            <Route exact path="/" render={routeProps => <Redirect to="/guest/rooms" />} />
            <Route exact path="/login" component={onlyAnonCanAccess(LogIn)} />
            <Route exact path="/auth/facebook" component={onlyAnonCanAccess(AuthFacebook)} />
            <Route exact path="/signup" component={onlyAnonCanAccess(SignUp)} />
            <Route exact path="/signup/after-submit" component={SignUpAfterSubmit} />
            <Route exact path="/signup/activate/confirm/:uid/:token" component={SignUpConfirm} />
            <Route exact path="/password/forgot" component={PasswordForgot} />
            <Route
              exact
              path="/password/forgot/confirm/:uid/:token"
              component={PasswordForgotConfirm}
            />
            <Route exact path="/guest/rooms" component={onlyUserCanAccess(GuestRoomsList)} />
            <Route exact path="/guest/rooms/:id(\d+)" component={GuestRoomAnswerNotSubmit} />
            <Route exact path="/guest/rooms/:id(\d+)/view" component={GuestRoomAnswerSubmitted} />
            <Route exact path="/owner/rooms" component={onlyUserCanAccess(OwnerRoomsList)} />
            <Route exact path="/owner/rooms/create" component={CreateRoom} />
            <Route
              exact
              path="/owner/rooms/create/clone"
              component={CreateRoomCloneWithoutGuests}
            />
            <Route exact path="/owner/rooms/:id(\d+)" component={DraftRoom} />
            <Route exact path="/owner/rooms/:id(\d+)/view" component={PublishedRoom} />
            <Route exact path="/owner/rooms/:id(\d+)/joinreqs" component={ViewJoinReqs} />
            <Route exact path="/profile" component={onlyUserCanAccess(Profile)} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
