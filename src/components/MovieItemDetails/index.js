import {Component} from 'react'
import Header from '../Header'

import MovieContext from '../../context/MovieContext'
import Footer from '../Footer'
// import LoadingElement from '../LoaderElement'
import MovieItem from '../MovieItem'

class MovieItemDetails extends Component {
  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log('username from movieItemDetails', {username})

          return (
            <>
              <div className="home-container">
                <Header />
                <MovieItem />
              </div>
              <Footer />
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default MovieItemDetails
