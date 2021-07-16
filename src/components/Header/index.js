import {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-section">
          <NavLink
            exact
            to="/"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            <p className="nav-link-name">Home</p>
          </NavLink>
          <NavLink
            exact
            to="/blogs"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            <p className="nav-link-name">Blogs</p>
          </NavLink>
          <button
            type="button"
            onClick={this.logout}
            className="nav-link-logout"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
