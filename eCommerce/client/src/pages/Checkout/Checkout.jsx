import './Checkout.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeRequest } from '@/hooks/makeRequest'
import { Link } from 'react-router-dom'

export default function Checkout() {
  const { session_id } = useParams()
  const [session, setSession] = useState(null)
  const [orderProducts, setOrderProducts] = useState([])

  const TAX_RATES = {
    US: 0.07, // Example general sales tax rate for the U.S.
    CA: 0.13 // Example general sales tax rate for Canada
  }

  useEffect(() => {
    const fetchStripeData = async () => {
      try {
        const response = await makeRequest.get(
          `/orders/checkout-session/${session_id}`
        )
        setSession(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStripeData()
  }, [session_id])

  useEffect(() => {
    if (!session) return

    const fetchStrapiOrderData = async () => {
      try {
        const response = await makeRequest.get(
          `/orders?[filters][stripeId][$eq]=${session_id}`
        )
        setOrderProducts(response.data.data[0].attributes.products)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStrapiOrderData()
  }, [session, session_id])

  if (!session || !session.shippingDetails) {
    return <p>Loading...</p>
  }

  const { line1, city, state, country, postal_code } =
    session.shippingDetails.address
  const totalPrice = orderProducts
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2)
  const taxRate = TAX_RATES[country] || 0
  const taxAmount = (totalPrice * taxRate).toFixed(2)
  const grandTotal = (parseFloat(totalPrice) + parseFloat(taxAmount)).toFixed(
    2
  )

  const address = encodeURIComponent(
    `${line1}, ${city}, ${state}, ${country}, ${postal_code}`
  )
  const googleMapsUrl = `https://maps.google.com/maps?q=${address}&hl=en&z=14&output=embed`

  return (
    <>
      <div className="thank-you-page">
        <div className="orderDetails">
          <iframe
            src={googleMapsUrl}
            width="500"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <h1>Thank you for your order, {session.shippingDetails.name}!</h1>

          <p>
            Your order has been placed and is being processed. You will receive
            an email confirmation shortly.
          </p>

          <div className="paymentDetails">
            <h2>Shipping Details</h2>
            <p>
              {session.shippingDetails.name}
              <br />
              {session.shippingDetails.address.line1}
              <br />
              {session.shippingDetails.address.city},{' '}
              {session.shippingDetails.address.state},{' '}
              {session.shippingDetails.address.country},{' '}
              {session.shippingDetails.address.postal_code}
            </p>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <img src="/ty-img.webp" alt="" className="tyImg" />

          <ul>
            {orderProducts.map((item) => (
              <Link
                className="link"
                to={`/product/${item.title}`}
                key={item.id}
              >
                <li>
                  <img src={item.img} alt={item.title} />
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </li>
              </Link>
            ))}
          </ul>
          <div className="tax">
            <span>Tax:</span>
            <span>${taxAmount}</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>${grandTotal}</span>
          </div>

          <div className="continue">
            <button onClick={() => (window.location.href = '/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
