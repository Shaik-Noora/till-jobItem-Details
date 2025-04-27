import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: true, errorMsg: ''}

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="txt">
          USERNAME
        </label>
        <input
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={this.onChangeUsername}
          className="inp"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="txt">
          PASSWORD
        </label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
          className="inp"
        />
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successForm = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  failureForm = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.successForm(data.jwt_token)
    } else {
      this.failureForm(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="cont">
        <form className="form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          {this.renderUserName()}
          {this.renderPassword()}
          <button className="btn" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
