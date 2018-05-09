import React, { Component } from 'react'

import helloSvg from '../static/hello-2.svg'


export default class Home extends Component {
  render() {
    return (
      <div>
        <h5>Home Page</h5>
        <img src={helloSvg} className="rounded img-fluid my-3" alt="Image" style={{width: '20rem'}}/>
        <div>
          Note :
          <ul style={{maxWidth: '30rem'}}>
            <li>We have not implemented smtp server for production yet. 
              So, the confirmation e-mail for completing sign-up process will not work at this moment.</li>
            <li>If you want to try out our app, go to 'Log in' page and use 
              the test account detail on that page to log in.</li>
          </ul>
        </div>
      </div>
    )
  }
}
