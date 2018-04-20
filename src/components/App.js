import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../containers/home'
import LogIn from '../containers/login'
import LogOut from '../containers/logout'
import UserRoomsList from '../containers/user_rooms_list'
import RoomDetail from '../containers/own_room_detail'
import SignUp from '../containers/signup'

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
        <h1 className="text-xs-center">Front-end</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={onlyAnonCanAccess(LogIn)} />
            <Route exact path="/logout" component={onlyUserCanAccess(LogOut)} />
            <Route exact path="/signup" component={onlyAnonCanAccess(SignUp)}/>
            <Route exact path="/user/rooms" component={onlyUserCanAccess(UserRoomsList)} />
            {/* <Route exact path="/user/rooms" component={UserRoomsList} /> */}
            <Route exact path="/user/rooms/:id(\d+)" component={RoomDetail} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App