import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'
import {HiOutlineSearch} from 'react-icons/hi'
import MovieContext from '../../context/MovieContext'

import './index.css'

const Footer = () => (
  <MovieContext.Consumer>
    {value => {
      const {username} = value
      console.log(username)

      return (
        <div className="footer-container">
          <div>
            <FaGoogle size={30} className="footer-icon" />
            <FaTwitter size={30} className="footer-icon" />
            <FaYoutube size={30} className="footer-icon" />
            <FaInstagram size={30} className="footer-icon" />
            <HiOutlineSearch size={30} className="footer-icon" />
          </div>
          <p className="contact-heading">Contact us</p>
        </div>
      )
    }}
  </MovieContext.Consumer>
)
export default Footer
