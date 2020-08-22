import React from "react"
import '../css/Landing.css'

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
    }

    this.onLogin = this.onLogin.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  onLogin(e){
    if(e){
      e.preventDefault();
    }
    this.setState({
      processing_login: true
    })
    firebase.auth().signInWithEmailAndPassword(this.state.landing_login_email, this.state.landing_login_password)
      .then((credential) => {
        this.setState({
          processing_login: false,
          successful_login: true,
          failed_login: false,
          failed_password: false,
          failed_email: false
        })
      }, ((rejection) => {
        if(rejection.code === 'auth/wrong-password'){
          this.setState({
            processing_login: false,
            failed_login: true,
            failed_password: true,
            failed_email: false
          })
        } else if(rejection.code === 'auth/user-not-found' || rejection.code === 'auth/invalid-email'){
          this.setState({
            processing_login: false,
            failed_login: true,
            failed_email: true,
            failed_password: false
          })
        }
      })).catch((error) => {
        console.log(error)
    })
  }

  onInputChange(e){
    this.setState({
      successful_login: false,
      failed_login: false,
      failed_password: false,
      failed_email: false,
      [e.target.name]: e.target.value
    });
  }

  handleKeyDown(e){
    if (e.key === 'Enter') {
      this.onLogin()
    }
  }

  render() {
    let containerClasses = ['landing-container']
    let emailInputClasses = ['landing-login-input']
    let passwordInputClasses = ['landing-login-input']
    let submitButtonClasses = ['login-submit-button']

    // Checks on input values
    let validEmail = true

    if(this.state.landing_login_email.length > 0 && !emailregex.test(this.state.landing_login_email)){
      validEmail = false
    } else if(this.state.landing_login_email.length <= 0){
      validEmail = false
    }

    let validPassword = true

    if(this.state.landing_login_password.length > 0 && this.state.landing_login_password.length < 6){
      validPassword = false
    } else if(this.state.landing_login_password.length <= 0){
      validPassword = false
    }

    if(this.state.successful_login){
      containerClasses.push('success')
    } else if(this.state.failed_login){
      if(this.state.failed_email){
        emailInputClasses.push('failure')
      } else if(this.state.failed_password){
        passwordInputClasses.push('failure')
      }
      containerClasses.push('failure')
    } else if(this.state.processing_login){
      containerClasses.push('processing')
    }

    let pageStatus = 'Log in to your account'

    return (
      <div className='landing-background'>
        <div className='blur'>
          <div className={containerClasses.join(' ')}>
            <div className='login-form-container'>
              <h1 className='landing-title'>Larkin Motors</h1>
              <h2 className='landing-subtitle'>{pageStatus}</h2>
              <div className='email-input-container'>
                <input id='email-input' className={emailInputClasses.join(' ')} type='text' name='landing_login_email' onChange={this.onInputChange} onKeyDown={this.handleKeyDown} placeholder='Email'/>
              </div>
              <div className='password-input-container'>
                <input id='password-input' className={passwordInputClasses.join(' ')} type='password' name='landing_login_password' onChange={this.onInputChange} onKeyDown={this.handleKeyDown} placeholder='Password'/>
              </div>
              <button className={submitButtonClasses.join(' ')} disabled={!validEmail || !validPassword} onClick={this.onLogin}>Submit</button>
            </div>
            <h2 className='create-account-link'>Create Account</h2>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
