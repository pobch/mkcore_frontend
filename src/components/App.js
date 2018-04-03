import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import LogIn from '../containers/login'
import LogOut from '../containers/logout'
import UserRoomsList from '../containers/user_rooms_list'

import requireAuth from '../helpers/require_auth'


function Home(props) {
  return (
    <div>
      <h5>Home Page</h5>
      <div className="text-xs-center">
        <Link className="btn btn-primary" to="/login">Log in</Link>
        <Link className="btn btn-danger" to="/logout">Log Out</Link>
        <div>
          <Link to="/user-rooms">Rooms<br/><i>(logged in users only)</i></Link>
        </div>
      </div>
    </div>
  )
}

function NotFound(props) {
  return (
    <div>
      <h5>404 Not Found</h5>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-xs-center">Makrub Front-end</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/logout" component={LogOut} />
            <Route exact path="/user-rooms" component={requireAuth(UserRoomsList)} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App