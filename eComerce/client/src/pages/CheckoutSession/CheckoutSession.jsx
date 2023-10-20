import React from "react";
import "./Checkout.scss";
import { useParams } from "react-router-dom";

function CheckoutSession() {
  const { session_id } = useParams();

  console.log(session_id);
  return (
    <div className="checkoutWrapper">
      <h1>CheckoutSession</h1>
    </div>
  );
}

export default CheckoutSession;
