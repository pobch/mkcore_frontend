import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LogIn from '../containers/login'
import LogOut from '../containers/logout'
import GuestRoomsList from '../containers/guest_rooms_list'
import OwnerRoomsList from '../containers/owner_rooms_list'
import EditRoom from '../containers/owner_room_edit'
import SignUp from '../containers/signup'
import SurveyEdit from '../containers/owner_survey_edit'
import GuestAnswer from '../containers/guest_answer'
import ViewJoinReqs from '../containers/owner_view_join_reqs'

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
            <Route exact path="/" component={onlyUserCanAccess(GuestRoomsList)} />
            <Route exact path="/login" component={onlyAnonCanAccess(LogIn)} />
            <Route exact path="/logout" component={onlyUserCanAccess(LogOut)} />
            <Route exact path="/signup" component={onlyAnonCanAccess(SignUp)}/>
            <Route exact path="/guest/rooms" component={onlyUserCanAccess(GuestRoomsList)} />
            <Route exact path="/guest/rooms/:id(\d+)/answer" component={GuestAnswer}/>
            {/* <Route exact path="/user/rooms" component={GuestRoomsList} /> */}
            <Route exact path="/owner/rooms" component={OwnerRoomsList}/>
            <Route exact path="/owner/rooms/:id(\d+)" component={EditRoom} />
            <Route exact path="/owner/rooms/:id(\d+)/survey" component={SurveyEdit} />
            <Route exact path="/owner/rooms/:id(\d+)/joinreqs" component={ViewJoinReqs}/>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App