import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <>
      <nav className="navv">
        <Link to="/" className="nav-text">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="ull">
          <li>
            <Link to="/" className="nav-text">
              Home
            </Link>
          </li>

          <li>
            <Link to="/jobs" className="nav-text">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
