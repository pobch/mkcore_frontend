import React, { Component } from 'react'

import helloSvg from '../static/hello-2.svg'


export default class Home extends Component {
  render() {
    return (
      <div>
        <h5>Home Page</h5>
        <img src={helloSvg} className="rounded img-fluid my-3" alt="Image" style={{width: '20rem'}}/>
        <ul style={{maxWidth: '25rem'}}>
          <li>We have not implemented smtp server for production yet.</li>
          <li>Click Log in and use the test account on that page if you want to try our app.</li>
        </ul>
      </div>
    )
  }
}
