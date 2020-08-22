import React from "react"
import '../css/Landing.css'

import continueicon from '../assets/continue.svg'
import loading from '../assets/loading.svg'
import checkmark from '../assets/check.svg'
import successring from '../assets/success-ring.svg'
import failure from '../assets/failure.svg'
import failurering from '../assets/failure-ring.svg'

const { Component } = require("react")
const emailregex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")

const firebase = require("firebase/app");
require("firebase/auth");

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      landing_login_email: '',
      landing_login_password: '',
      processing_email: false,
      confirmed_email: false
    }

    this.onLogin = this.onLogin.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onLogin(e){
    e.preventDefault();
    this.setState({
      processing_email: true
    })

    firebase.auth().fetchSignInMethodsForEmail(this.state.landing_login_email).then((signInMethods) => {
      if(signInMethods.includes('password')){
        this.setState({
          confirmed_email: true
        })
      }
    })
  }

  onInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let emailArrowClasses = ['login-email-arrow']
    let passwordArrowClasses = ['login-password-arrow']

    let emailInputClasses = ['landing-login-input']
    let passwordInputClasses = ['landing-login-input']

    if(this.state.confirmed_email){
      emailInputClasses.push('topborderonly');
      emailArrowClasses.push('hide');
      passwordInputClasses.push('show');
      passwordArrowClasses.push('show');
    }

    // Checks on input values
    let validEmail = true
    if(this.state.landing_login_password.length < 6) {
      passwordArrowClasses.push('disabled')
    }

    if(this.state.landing_login_email.length > 0 && !emailregex.test(this.state.landing_login_email)){
      validEmail = false
    } else if(this.state.landing_login_email.length <= 0){
      validEmail = false
    }

    if(!validEmail){
      emailArrowClasses.push('disabled')
    }

    return (
      <div className='landing-background'>
        <div className='blur'>
          <div className='landing-container'>
            <h1 className='landing-title'>Larkin Motors</h1>
            <div className='email-input-container'>
              <input id='email-input' className={emailInputClasses.join(' ')} type='text' name='landing_login_email' onChange={this.onInputChange} placeholder='Email'/>
              <img className={emailArrowClasses.join(' ')} onClick={this.onLogin} src={continueicon} alt='arrow'/>
            </div>
            <div className='password-input-container'>
              <input id='password-input' className={passwordInputClasses.join(' ')} type='password' name='landing_login_password' onChange={this.onInputChange} placeholder='Password'/>
              <img className={passwordArrowClasses.join(' ')} src={continueicon} alt='arrow'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
