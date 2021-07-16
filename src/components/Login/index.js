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

  componentDidMount() {
    this.getSession()
  }

  getSession = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/authentication/token/new?api_key=32e8531da114ed1d3037278cd9d914cc',
    )
    const jsonResponse = await response.json()
    console.log('json', jsonResponse)
    this.setState({sessionToken: jsonResponse.request_token})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    const {username} = this.state

    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
      path: '/',
    })
    Cookies.set('username', username, {
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
    const {sessionToken, username, password} = this.state
    console.log(this.state)
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password, request_token: sessionToken}),
      headers: {
        'Content-type': 'application/json',
      },
    }
    console.log(options.body)
    const response = await fetch(
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=32e8531da114ed1d3037278cd9d914cc',
      options,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.request_token)
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
    return (
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/loginBackground.png)`,
        }}
      >
        <div className="login-sec">
          <div className="login-logo-sec">
            <img
              className="login-logo"
              src={`${process.env.PUBLIC_URL}/img/logo.png`}
              alt="logo"
            />
          </div>
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
                  please enter a valid Email & Password
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
