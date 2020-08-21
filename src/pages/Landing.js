import React from "react";
import '../css/Landing.css'

const {Component} = require("react");

const emailregex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")


class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      landing_login_email: '',
      landing_login_password: ''
    }

    this.onLogin = this.onLogin.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onLogin(e){
    e.preventDefault();
  }

  onInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
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
              <input className='landing-login-submit' type='submit' value='Sign In'/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
