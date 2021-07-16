import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    error: false,
    sessionToken: '',
    username: '',
    password: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = () => {
    console.log('failure')
    this.setState({error: true})
  }

  authenticate = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(this.state)
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-type': 'application/json',
      },
    }
    console.log(options.body)
    const response = await fetch('http://localhost:3001/login/', options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwtToken)
    } else {
      this.onSubmitFailure()
    }
  }

  onChangeUsername = event => {
    const username = event.target.value
    this.setState({username})
  }

  onChangePassword = event => {
    const password = event.target.value
    this.setState({password})
  }

  render() {
    const {error} = this.state
    console.log(error)
    return (
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/loginBackground.png)`,
        }}
      >
        <div className="login-sec">
          <div className="login-logo-sec" />
          <div className="login-form-sec">
            <h1 className="login-heading">Sign In</h1>
            <form className="login-form" onSubmit={this.authenticate}>
              <p className="login-label username-label">USERNAME</p>
              <input
                className="login-input username-input"
                type="text"
                onBlur={this.onChangeUsername}
              />
              <p className="login-label password-label">PASSWORD</p>
              <input
                className="login-input password-input"
                type="password"
                onBlur={this.onChangePassword}
              />
              {error ? (
                <p className="login-error">
                  please enter a valid username & Password
                </p>
              ) : (
                ''
              )}
              <div className="login-submit-btn-sec">
                <button className="login-submit-button" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
