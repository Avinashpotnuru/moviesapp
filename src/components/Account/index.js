import MovieContext from '../../context/MovieContext'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => (
  <MovieContext.Consumer>
    {value => {
      const {username, password, triggerLogout} = value

      const onClickLogout = () => {
        triggerLogout(props)
      }

      const hiddenPassword = '*'.repeat(password.length)

      return (
        <>
          <div className="account-container" testid="account">
            <Header />
            <div className="account-container-2">
              <h1>
                Account
                <hr />
              </h1>

              <div className="account-element">
                <p className="header-element">Member ship</p>
                <div>
                  <p>{username}@gmail.com</p>
                  <p>Password: {hiddenPassword} </p>
                </div>
              </div>
              <hr />

              <div className="account-element">
                <p className="header-element">Plan Details</p>
                <div>
                  <p>Premium</p>
                  <p className="ultra-hd">Ultra HD</p>
                </div>
              </div>
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>

            <Footer />
          </div>
        </>
      )
    }}
  </MovieContext.Consumer>
)
export default Account
