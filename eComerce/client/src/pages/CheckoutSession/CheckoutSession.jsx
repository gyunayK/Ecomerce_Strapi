import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { makeRequest } from "@/hooks/makeRequest";

function CheckoutSession() {
  const { session_id } = useParams();
  const [session, setSession] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);

  console.log(session);
  console.log(orderProducts);

  const url = import.meta.env.VITE_APP_URL_API;
  useEffect(() => {
    const fetchStripeData = async () => {
      try {
        const response = await makeRequest.get(`/orders/checkout-session/${session_id}`);
        setSession(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStripeData();
  }, []);


  useEffect(() => {
    const fetchStrapiOrderData = async () => {
      try {
        const response = await makeRequest.get(`/orders?[filters][stripeId][$eq]=${session_id}`);
        setOrderProducts(response.data.data[0].attributes.products)
      } catch (error) {
        console.log(error);
      }
    }

    fetchStrapiOrderData();
  }, []);
  

  // console.log(data);
  return (
    <div className="thank-you-page">
      <h1>Thank You For Your Purchase!</h1>
      <p>Your order has been placed and is being processed. You will receive an email confirmation shortly.</p>
      <button onClick={() => window.location.href = '/'}>Continue Shopping</button>
    </div>
  );
}

export default CheckoutSession;
