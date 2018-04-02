import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import LogIn from '../containers/login'

function Home(props) {
  return (
    <div>
      <h5>Home Page !!!</h5>
      <div className="text-xs-center">
        <Link className="btn btn-primary" to="/login">
          Log in
        </Link>
      </div>
    </div>
  )
}

function NotFound(props) {
  return (
    <div>
      <h5>404 Not Found jaaa</h5>
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
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App