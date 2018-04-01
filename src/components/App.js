import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

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

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-xs-center">Makrub Front-end</h1>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogIn} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App