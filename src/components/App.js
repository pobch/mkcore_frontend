import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import LogIn from '../containers/login'
import AuthFacebook from '../containers/auth_facebook'
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

import CreateRoomCloneWithoutGuests from '../components/owner_room_create_clone'
import NotFound from '../components/notfound'


class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter basename="/app">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/guest/rooms"/>} />
            <Route exact path="/login" component={onlyAnonCanAccess(LogIn)} />
            <Route exact path="/auth/facebook" component={onlyAnonCanAccess(AuthFacebook)} />
            <Route exact path="/guest/rooms" component={onlyUserCanAccess(GuestRoomsList)} />
            <Route exact path="/guest/rooms/:id(\d+)" component={GuestRoomAnswerNotSubmit}/>
            <Route exact path="/guest/rooms/:id(\d+)/view" component={GuestRoomAnswerSubmitted}/>
            <Route exact path="/owner/rooms" component={onlyUserCanAccess(OwnerRoomsList)}/>
            <Route exact path="/owner/rooms/create" component={CreateRoom}/>
            <Route exact path="/owner/rooms/create/clone" component={CreateRoomCloneWithoutGuests}/>
            <Route exact path="/owner/rooms/:id(\d+)" component={DraftRoom} />
            <Route exact path="/owner/rooms/:id(\d+)/view" component={PublishedRoom}/>
            <Route exact path="/owner/rooms/:id(\d+)/joinreqs" component={ViewJoinReqs}/>
            <Route exact path="/profile" component={onlyUserCanAccess(Profile)}/>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
