import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LogIn from '../containers/login'

function Home(props) {
  return (
    <div>Home Page !!!</div>
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