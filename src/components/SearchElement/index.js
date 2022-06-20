import {Component} from 'react'

import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import Cookies from 'js-cookie'
import LoadingElement from '../LoaderElement'

import MovieContext from '../../context/MovieContext'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchElement extends Component {
  state = {
    apiStatus: apiConstants.initial,
    allSearchResults: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getSearchElementVideos()
  }

  getSearchElementVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput} = this.state

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedVideosList = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        allSearchResults: updatedVideosList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickInput = event => {
    if (event.key === 'Enter') {
      this.getSearchElementVideos()
    }
  }

  render() {
    const {searchInput} = this.state

    const searchElements = () => {
      this.getSearchElementVideos()
    }

    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log('username from popular', {username})

          const renderLoader = () => <LoadingElement />

          const renderSuccessView = () => {
            const {allSearchResults} = this.state
            const showSearchResults = allSearchResults.length > 0

            return showSearchResults ? (
              <div className="popular-video-list-container">
                <ul className="popular-video-list">
                  {allSearchResults.map(each => (
                    <li key={each.id}>
                      <Link to={`/movies/${each.id}`} key={each.id}>
                        <img
                          src={each.posterPath}
                          alt={each.title}
                          className="popular-image"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="failure-view-container">
                <img
                  src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650384280/Mini%20Project%20Netflix%20Clone/no_results_tjfgmd.png"
                  alt="no movies"
                  className="failure-image"
                />
                <p className="search-content">
                  Your search for {searchInput} did not find any matches.
                </p>
              </div>
            )
          }

          const renderMovieItem = () => {
            this.getSearchElementVideos()
          }

          const renderFailureView = () => (
            <div className="failure-view-container">
              <img
                alt="failure view"
                src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
                className="failure-image"
              />
              <p className="search-content">
                Something went wrong. Please try again
              </p>
              <button
                type="button"
                className="try-again-button"
                onClick={renderMovieItem}
              >
                Try again
              </button>
            </div>
          )

          const getResult = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiConstants.success:
                return renderSuccessView()
              case apiConstants.failure:
                return renderFailureView()
              case apiConstants.inProgress:
                return renderLoader()
              default:
                return null
            }
          }

          return (
            <div testid="searchItem" className="search-element">
              <div className="input-element-container">
                <input
                  type="search"
                  value={searchInput}
                  onChange={this.changeSearchInput}
                  placeholder="Search"
                  onKeyDown={this.onClickInput}
                  className="input-element"
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  onClick={searchElements}
                >
                  <HiOutlineSearch size={25} color="white" />
                </button>
              </div>
              {getResult()}
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default SearchElement
