import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchApiStatus: apiStatusConstants.initial,
    searchList: [],
    inputValue: '',
  }

  componentDidMount() {
    // this.callSearchApi()
  }

  getSearchViews = () => {
    const {searchApiStatus} = this.state
    console.log(searchApiStatus)
    switch (searchApiStatus) {
      case apiStatusConstants.success:
        return this.SearchSucessView()
      case apiStatusConstants.failure:
        return this.PosterFailureView()
      case apiStatusConstants.inProgress:
        return this.HomePageLoadingView()
      default:
        return null
    }
  }

  SearchSucessView = () => {
    const {ApiPosterStatus, searchList} = this.state
    console.log('sucess', searchList)
    // const num = 0
    return (
      <div className="popular-movies-section">
        <ul className="d-flex flex-row col-12 similar-movies-list-items">
          {searchList.map(eachMovie => (
            <li className="col-4 p-1">
              <Link to={`/movies/${eachMovie.id}`}>
                <img
                  alt={eachMovie.title}
                  className="popular-movie-item col-12"
                  src={eachMovie.backdropPath}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  PosterFailureView = () => {
    const {inputValue} = this.state
    return (
      <div className="col-12 d-flex flex-column align-items-center justify-content-center failure-view">
        {/* <BiError /> */}
        <img
          alt="no movies"
          src="https://res.cloudinary.com/dnjuzbuoz/image/upload/v1655559570/Group_7394_jx0wym.png"
        />
        <p>Your search for {inputValue} did not find any matches.</p>
      </div>
    )
  }

  HomePageLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  callSearchApi = async searchInput => {
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    this.setState({
      ApiTrendingNowStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData, 'Search movies')
      const {results} = await fetchedData
      if (results.length === 0) {
        this.setState({
          searchApiStatus: apiStatusConstants.failure,
          inputValue: searchInput,
        })
      } else {
        const CamelCaseTrendingMovies = results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))
        console.log(CamelCaseTrendingMovies)
        this.setState({
          searchApiStatus: apiStatusConstants.success,
          searchList: [...CamelCaseTrendingMovies],
        })
      }
    } else {
      this.setState({searchApiStatus: apiStatusConstants.failure})
    }
  }

  SearchFun = inputValue => {
    this.callSearchApi(inputValue)
  }

  render() {
    return (
      <div className="search-route">
        <div className="search-header">
          <Header SearchFun={this.SearchFun} search="true" />
        </div>

        <>
          <h1>Home</h1>
        </>

        <div>{this.getSearchViews()}</div>
      </div>
    )
  }
}
export default Search
