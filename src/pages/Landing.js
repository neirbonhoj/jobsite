import React from "react";
import '../css/Landing.css'

import checkmark from '../assets/check.svg'
import failure from '../assets/failure.svg'

const {Component} = require("react");
const emailregex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")


class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      landing_login_email: '',
      landing_login_password: '',
      processing_login: false,
      successful_login: false,
      failed_login: false
    }

    this.onLogin = this.onLogin.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onLogin(e){
    e.preventDefault();
    this.setState({
      processing_login: true
    })
  }

  onInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    // Animation of the login form submit button
    //    Arrays are used to store class names dynamically for HTML elements
    //    processing  = waiting for server response
    //    success     = server has logged us in
    //    failed      = credentials are invalid
    //    hide        = user has not submitted the form
    let landingLoginSubmitClasses = ['landing-login-submit'];
    let landingLoginLoadingIconClasses = ['landing-login-loading-icon'];
    let landingLoginCheckmarkIconClasses = ['landing-login-checkmark-icon'];
    let landingLoginFailureIconClasses = ['landing-login-failure-icon'];
    if(this.state.processing_login){
      landingLoginSubmitClasses.push('processing')
      landingLoginLoadingIconClasses.push('processing')
      landingLoginCheckmarkIconClasses.push('hide')
      landingLoginFailureIconClasses.push('hide')
    } else if(this.state.successful_login) {
      landingLoginSubmitClasses.push('processing')
      landingLoginLoadingIconClasses.push('success')
      landingLoginCheckmarkIconClasses.push('success')
      landingLoginFailureIconClasses.push('hide')
    } else if(this.state.failed_login) {
      landingLoginSubmitClasses.push('processing')
      landingLoginLoadingIconClasses.push('failure')
      landingLoginCheckmarkIconClasses.push('hide')
      landingLoginFailureIconClasses.push('failure')
    } else {
      landingLoginLoadingIconClasses.push('hide')
      landingLoginCheckmarkIconClasses.push('hide')
      landingLoginFailureIconClasses.push('hide')
    }

    return (
      <div className='landing-background'>
        <div className='blur'>
          <div className='landing-container'>
            <h1 className='landing-title'>Larkin Motors</h1>
            <form className='landing-login-form' onSubmit={this.onLogin}>
              <input className='landing-login-input' type='text' name='landing_login_email' onChange={this.onInputChange} placeholder='Username'/>
              <br/>
              <input className='landing-login-input' type='password' name='landing_login_password' onChange={this.onInputChange} placeholder='Password'/>
              <br/>
              <div className='landing-login-submit-container'>
                <input className={landingLoginSubmitClasses.join(' ')} type='submit' value='Sign In'/>
                <div className={landingLoginLoadingIconClasses.join(' ')}/>
                <img className={landingLoginCheckmarkIconClasses.join(' ')} src={checkmark} alt='checkmark'/>
                <img className={landingLoginFailureIconClasses.join(' ')} src={failure} alt='failure'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
