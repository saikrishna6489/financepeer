import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <>
        <div className="account-hider" />
        <div
          className="not-found-container"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/notfoundbackground.png)`,
          }}
        >
          <div className="not-found-sec">
            <h1 className="not-found-heading">Lost Your Way ?</h1>
            <p className="not-found-description">
              Sorry, we can’t find that page. You’ll find lots to explore on the
              home page
            </p>
            <Link to="/">
              <button className="not-found-home-redirect-button" type="button">
                Netflix Home
              </button>
            </Link>
            <p className="not-found-error">
              Error code <b>NSES- 404</b>
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default NotFound
