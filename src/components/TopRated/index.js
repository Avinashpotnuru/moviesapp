import {Component} from 'react'

import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import LoadingElement from '../LoaderElement'

import MovieContext from '../../context/MovieContext'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRated extends Component {
  state = {
    apiStatus: apiConstants.initial,
    allTopRatedItemVideos: [],
  }

  componentDidMount() {
    this.getTopRatedItemVideos()
  }

  getTopRatedItemVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        allTopRatedItemVideos: updatedVideosList,
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
          console.log('username from originals', {username})

          const renderLoader = () => <LoadingElement />

          const renderSuccessView = () => {
            const {allTopRatedItemVideos} = this.state

            const settings = {
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
              ],
            }

            return (
              <ul>
                <Slider {...settings} className="slick-container">
                  {allTopRatedItemVideos.map(each => (
                    <div className="slick-item" key={each.id}>
                      <li key={each.id}>
                        <Link to={`/movies/${each.id}`}>
                          <img
                            src={each.posterPath}
                            alt={each.title}
                            className="logo-image"
                          />
                        </Link>
                      </li>
                    </div>
                  ))}
                </Slider>
              </ul>
            )
          }

          const renderMovieItem = () => {
            this.getTopRatedItemVideos()
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

          return <div testid="toprated">{getResult()}</div>
        }}
      </MovieContext.Consumer>
    )
  }
}
export default TopRated
