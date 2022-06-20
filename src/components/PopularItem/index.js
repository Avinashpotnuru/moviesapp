import {Component} from 'react'

import {Link} from 'react-router-dom'

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

class PopularItem extends Component {
  state = {
    apiStatus: apiConstants.initial,
    allPopularVideos: [],
  }

  componentDidMount() {
    this.getPopularItemVideos()
  }

  getPopularItemVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        overview: each.overView,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        allPopularVideos: updatedVideosList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log('username from popular', {username})

          const renderLoader = () => <LoadingElement />

          const renderSuccessView = () => {
            const {allPopularVideos} = this.state

            return (
              <div className="popular-video-list-container">
                <ul className="popular-video-list">
                  {allPopularVideos.map(each => (
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
            )
          }

          const renderMovieItem = () => {
            this.getPopularItemVideos()
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
                onClick={renderMovieItem}
                className="try-again-button"
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

          return <div testid="trending">{getResult()}</div>
        }}
      </MovieContext.Consumer>
    )
  }
}
export default PopularItem
