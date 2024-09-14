import './Cancel.scss'
import { Link } from 'react-router-dom'

function Cancel() {
  return (
    <div className="cancelWrapper">
      <div className="cancel">
        <img src="/payment.webp" alt="paymentImg" />
        <h1>Payment Cancelled</h1>
        <p>Payment was not successful, please try again</p>
        <Link className="link" to={'/'}>Go back to home page</Link>
      </div>
    </div>
  )
}

export default Cancel
