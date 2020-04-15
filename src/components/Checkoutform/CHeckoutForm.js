import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const [payError, setPayError ] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
      setPayError (error.message);
      setPayMethod(null);
    }
    else{
      setPayMethod(paymentMethod);
      setPayError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        payError && <p style={{color: 'red'}}>{payError}</p>
      }
      {
        payMethod && <p style={{color: 'green'}}>Payment Successful</p>
      }
    </form>
  );
};

export default CheckoutForm;