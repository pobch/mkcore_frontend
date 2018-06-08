import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import LogIn from '../containers/login'
import GuestRoomsList from '../containers/guest_rooms_list'
import OwnerRoomsList from '../containers/owner_rooms_list'
import EditRoom from '../containers/owner_room_edit'
import SignUp from '../containers/signup'
import GuestEditRoom from '../containers/guest_room_edit'
import GuestViewRoom from '../containers/guest_room_view'
import ViewJoinReqs from '../containers/owner_join_reqs'
import Profile from '../containers/profile'
import CreateRoom from '../containers/owner_room_create'
import OwnerViewRoom from '../containers/owner_room_view'

import onlyUserCanAccess from '../hoc/only_user_can_access'
import onlyAnonCanAccess from '../hoc/only_anon_can_access'


function NotFound(props) {
  return (
    <div>
      <h5>Not Found Page</h5>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/guest/rooms"/>} />
            <Route exact path="/login" component={onlyAnonCanAccess(LogIn)} />
            <Route exact path="/signup" component={onlyAnonCanAccess(SignUp)}/>
            <Route exact path="/guest/rooms" component={onlyUserCanAccess(GuestRoomsList)} />
            <Route exact path="/guest/rooms/:id(\d+)" component={GuestEditRoom}/>
            <Route exact path="/guest/rooms/:id(\d+)/view" component={GuestViewRoom}/>
            {/* <Route exact path="/user/rooms" component={GuestRoomsList} /> */}
            <Route exact path="/owner/rooms" component={onlyUserCanAccess(OwnerRoomsList)}/>
            <Route exact path="/owner/rooms/create" component={CreateRoom}/>
            <Route exact path="/owner/rooms/:id(\d+)" component={EditRoom} />
            <Route exact path="/owner/rooms/:id(\d+)/view" component={OwnerViewRoom}/>
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
