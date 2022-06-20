import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import MovieContext from '../../context/MovieContext'
import './index.css'

class Login extends Component {
  state = {
    showSubmitError: false,
    errorMsg: '',
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {
            username,
            password,
            triggerChangeUsername,
            triggerChangePassword,
          } = value

          const onChangeUsername = event => {
            triggerChangeUsername(event)
          }

          const onChangePassword = event => {
            triggerChangePassword(event)
          }

          const onSubmitSuccess = jwtToken => {
            const {history} = this.props

            Cookies.set('jwt_token', jwtToken, {
              expires: 30,
            })
            history.replace('/')
          }

          const onSubmitFailure = errorMsg => {
            this.setState({showSubmitError: true, errorMsg})
          }

          const submitNetflixForm = async event => {
            event.preventDefault()

            const userDetails = {username, password}
            const url = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok === true) {
              onSubmitSuccess(data.jwt_token)
            } else {
              onSubmitFailure(data.error_msg)
            }
          }

          const renderPasswordField = () => (
            <>
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="password-input-field"
                value={password}
                onChange={onChangePassword}
                placeholder="Password"
              />
            </>
          )

          const renderUsernameField = () => (
            <>
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="username-input-field"
                value={username}
                onChange={onChangeUsername}
                placeholder="Username"
              />
            </>
          )

          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')

          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }

          return (
            <div className="login-form-container">
              <div>
                <img
                  src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
                  alt="login website logo"
                />
              </div>

              <form className="form-container" onSubmit={submitNetflixForm}>
                <h1 className="login-heading">Login</h1>
                <div className="input-container">{renderUsernameField()}</div>
                <div className="input-container">{renderPasswordField()}</div>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Login
