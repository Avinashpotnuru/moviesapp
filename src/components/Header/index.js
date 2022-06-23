import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {search, SearchFun} = props
  let enteredInput = ''
  const inputEntered = event => {
    enteredInput = event.target.value
  }

  const searchButtonClicked = () => {
    SearchFun(enteredInput)
  }

  return (
    <div className="header col-12" testid="header">
      <ul className="header-list-items d-flex flex-row justify-content-space-between">
        <li className="d-flex flex-row color-w">
          <Link to="/">
            <img
              className="img"
              alt="website logo"
              src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655456206/Group_7399_tjbtzb.png"
            />
          </Link>
          <Link to="/">
            <p className="color-w ml-3 head">Home</p>
          </Link>
          <Link to="/popular">
            <p className="color-w ml-1 head">Popular</p>
          </Link>
        </li>

        <li className="d-flex flex-row">
          <div className="search d-flex flex-row align-items-center">
            {search === 'true' && (
              <div className="d-flex flex-row search-input-container m-1">
                <input
                  onChange={inputEntered}
                  className="search-input"
                  type="search"
                />
                <button
                  type="button"
                  testid="searchButton"
                  onClick={searchButtonClicked}
                  className="button"
                  alt="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </div>
            )}
            {search !== 'true' && (
              <Link to="/search">
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  alt="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </Link>
            )}
          </div>
          <div>
            <Link to="/Account">
              <button type="button" className="profile-button">
                <img
                  alt="profile"
                  src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655477627/Avatar_v4saqp.png"
                />
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}
export default Header
