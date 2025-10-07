// CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Fetch the client secret when the page loads
  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret: ", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe has not loaded yet, or we don't have the clientSecret
      return;
    }

    // Confirm the payment with the client secret
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-success', // URL to redirect after payment
      },
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
    }
  };

  return (
    <div className="checkout-page">
      <h2>Complete Your Payment</h2>
      {clientSecret && (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button type="submit" disabled={!stripe}>
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
