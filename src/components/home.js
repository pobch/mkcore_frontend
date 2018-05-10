import React, { Component } from 'react'

import helloSvg from '../static/hello-2.svg'


export default class Home extends Component {
  render() {
    return (
      <div style={{maxWidth: '45rem'}}>
        <h5>Home Page</h5>
        <div>
          After logging in, you can :
          <ul>
            <li>Create your own room, then add your survey/question set in each room</li>
            <li>Join any existing rooms by 'Room Code' and 'Room Password', 
              then answer the survey/questions related to that room</li>
          </ul>
          Note :
          <ul>
            <li>We have not implemented smtp server for production yet. 
              So that the confirmation e-mail for completing sign-up process will not work at this moment.</li>
            <li>If you want to try out our app, go to 'Log in' page and use 
              the test account detail on that page to log in.</li>
          </ul>
        </div>
        <img src={helloSvg} className="rounded img-fluid my-3" alt="Hello" style={{width: '20rem'}}/>
      </div>
    )
  }
}
