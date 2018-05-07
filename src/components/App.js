import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './home'

import LogIn from '../containers/login'
import LogOut from '../containers/logout'
import UserRoomsList from '../containers/user_rooms_list'
import EditRoom from '../containers/user_own_room_edit'
import SignUp from '../containers/signup'
import SurveyEdit from '../containers/user_survey_edit'
import GuestAnswer from '../containers/user_guest_answer'
import TopNavbar from '../containers/topNavbar'

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
          <div>
            <TopNavbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={onlyAnonCanAccess(LogIn)} />
              <Route exact path="/logout" component={onlyUserCanAccess(LogOut)} />
              <Route exact path="/signup" component={onlyAnonCanAccess(SignUp)}/>
              <Route exact path="/user/rooms" component={onlyUserCanAccess(UserRoomsList)} />
              {/* <Route exact path="/user/rooms" component={UserRoomsList} /> */}
              <Route exact path="/user/rooms/:id(\d+)" component={EditRoom} />
              <Route exact path="/user/rooms/:id(\d+)/survey" component={SurveyEdit} />
              <Route exact path="/user/rooms/:id(\d+)/answer" component={GuestAnswer}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App