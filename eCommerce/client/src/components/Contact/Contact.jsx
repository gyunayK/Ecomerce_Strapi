import './Contact.scss'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import GoogleIcon from '@mui/icons-material/Google'
import PinterestIcon from '@mui/icons-material/Pinterest'
import { FaXTwitter } from 'react-icons/fa6'

const Contact = () => {
  return (
    <div className="contact">
      <div className="wrapper">
        <span>BE IN TOUCH WITH US:</span>
        <div className="mail">
          <input type="text" placeholder="Enter your email here" />
          <button>JOIN US</button>
        </div>
        <div className="icons">
          <FacebookIcon className="icon" />
          <InstagramIcon className="icon" />
          <FaXTwitter className="icon" />
          <GoogleIcon className="icon" />
          <PinterestIcon className="icon" />
        </div>
      </div>
    </div>
  )
}

export default Contact
