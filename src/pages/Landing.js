import React from "react";
import '../css/Landing.css'

import loading from '../assets/loading.svg'
import checkmark from '../assets/check.svg'
import successring from '../assets/success-ring.svg'
import failure from '../assets/failure.svg'
import failurering from '../assets/failure-ring.svg'

const { Component } = require("react");
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
    this.setSuccess = this.setSuccess.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onLogin(e){
    e.preventDefault();
    this.setState({
      processing_login: true
    })
    setInterval(this.setSuccess, 1500)
  }

  setSuccess(){
    this.setState({
      processing_login: false,
      successful_login: false,
      failed_login: true
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
    let submitButtonClasses = ['landing-login-submit', 'login-submit-margin-top'];
    let loadingIconClasses = ['landing-login-loading-icon', 'login-submit-margin-top'];
    let checkmarkIconClasses = ['landing-login-checkmark-icon'];
    let successRingClasses = ['landing-login-success-ring', 'login-submit-margin-top'];
    let failureIconClasses = ['landing-login-failure-icon'];
    let failureRingClasses = ['landing-login-failure-ring', 'login-submit-margin-top'];


    let emailInputClasses = ['landing-login-input']
    let passwordInputClasses = ['landing-login-input']

    if(this.state.processing_login){
      emailInputClasses.push('disabled')
      passwordInputClasses.push('disabled')

      submitButtonClasses.push('processing')
      loadingIconClasses.push('processing')
      checkmarkIconClasses.push('hide')
      failureIconClasses.push('hide')
      successRingClasses.push('hide')
      failureRingClasses.push('hide')
    } else if(this.state.successful_login) {
      emailInputClasses.push('disabled')
      passwordInputClasses.push('disabled')

      submitButtonClasses.push('processing')
      loadingIconClasses.push('hide')
      checkmarkIconClasses.push('success')
      failureIconClasses.push('hide')
      successRingClasses.push('success')
      failureRingClasses.push('hide')
    } else if(this.state.failed_login) {
      submitButtonClasses.push('processing')
      loadingIconClasses.push('hide')
      checkmarkIconClasses.push('hide')
      failureIconClasses.push('failure')
      successRingClasses.push('hide')
      failureRingClasses.push('failure')
    } else {
      loadingIconClasses.push('hide')
      checkmarkIconClasses.push('hide')
      failureIconClasses.push('hide')
      successRingClasses.push('hide')
      failureRingClasses.push('hide')
    }

    // Checks on input values

    if(this.state.landing_login_password.length < 6 && this.state.landing_login_password.length > 0) {
      passwordInputClasses.push('invalid')
    }
    if(this.state.landing_login_email.length > 0 && !emailregex.test(this.state.landing_login_email)){
      emailInputClasses.push('invalid')
    }

    return (
      <div className='landing-background'>
        <div className='blur'>
          <div className='landing-container'>
            <h1 className='landing-title'>Larkin Motors</h1>
            <form className='landing-login-form' onSubmit={this.onLogin}>
              <input className={emailInputClasses.join(' ')} type='text' name='landing_login_email' onChange={this.onInputChange} placeholder='Email'/>
              <input className={passwordInputClasses.join(' ')} type='password' name='landing_login_password' onChange={this.onInputChange} placeholder='Password'/>
              <div className='landing-login-submit-container'>
                <button className={submitButtonClasses.join(' ')}>Sign In</button>
                <img className={loadingIconClasses.join(' ')} src={loading} alt='loading'/>
                <img className={checkmarkIconClasses.join(' ')} src={checkmark} alt='checkmark'/>
                <img className={successRingClasses.join(' ')} src={successring} alt='successring'/>
                <img className={failureIconClasses.join(' ')} src={failure} alt='failure'/>
                <img className={failureRingClasses.join(' ')} src={failurering} alt='failurering'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
