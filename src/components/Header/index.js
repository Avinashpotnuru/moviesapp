import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdCancel} from 'react-icons/md'
import {CgPlayList} from 'react-icons/cg'

import MovieContext from '../../context/MovieContext'

import './index.css'

class Header extends Component {
  state = {isMenu: false}

  render() {
    const {isMenu} = this.state

    return (
      <MovieContext.Consumer>
        {value => {
          const {cartList} = value
          console.log('Header', cartList)

          const clickToClose = () => {
            this.setState(prevState => ({isMenu: !prevState.isMenu}))
          }

          return (
            <nav className="nav-header" testid="header">
              <div className="nav-content">
                <div className="nav-bar-large-container">
                  <Link to="/home">
                    <img
                      className="website-logo"
                      src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
                      alt="website logo"
                    />
                  </Link>

                  <ul className="nav-menu">
                    <Link to="/" className="nav-link">
                      <li className="nav-menu-item">Home</li>
                    </Link>

                    <Link to="/popular" className="nav-link">
                      <li className="nav-menu-item">Popular</li>
                    </Link>
                  </ul>

                  <ul className="nav-menu-profile">
                    <Link to="/search" className="nav-link">
                      <li className="nav-menu-item">
                        <button
                          type="button"
                          testid="searchButton"
                          className="search-button"
                        >
                          <HiOutlineSearch size={25} color="white" />
                        </button>
                      </li>
                    </Link>
                    <Link to="/account" className="nav-link">
                      <li className="nav-menu-item">
                        <img
                          src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650194938/Mini%20Project%20Netflix%20Clone/Avatar_ayfkv8.png"
                          alt="profile"
                          className="profile"
                        />
                      </li>
                    </Link>
                    <ul className="nav-menu-mobile">
                      <Link to="/search" className="nav-link">
                        <li className="nav-menu-item-mobile">
                          <button
                            type="button"
                            testid="searchButton"
                            className="search-button"
                          >
                            <HiOutlineSearch size={25} color="white" />
                          </button>
                        </li>
                      </Link>
                      <li className="nav-menu-item-mobile">
                        <button
                          type="button"
                          onClick={clickToClose}
                          className="nav-button"
                        >
                          <CgPlayList size={25} color="white" />
                        </button>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>

              {isMenu ? (
                <ul className="nav-menu-mobile">
                  <ul className="nav-menu-list-mobile">
                    <Link to="/" className="nav-link">
                      <li className="nav-menu-item-mobile">Home</li>
                    </Link>
                    <Link to="/popular" className="nav-link">
                      <li className="nav-menu-item-mobile">Popular</li>
                    </Link>
                    <Link to="/account" className="nav-link">
                      <li className="nav-menu-item-mobile">Account</li>
                    </Link>

                    <li className="nav-menu-item-mobile">
                      <button
                        type="button"
                        onClick={clickToClose}
                        className="nav-button"
                      >
                        <MdCancel size={25} color="white" />
                      </button>
                    </li>
                    {/* Add close button and change the state of the object so that */}
                  </ul>
                </ul>
              ) : null}
            </nav>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default withRouter(Header)
