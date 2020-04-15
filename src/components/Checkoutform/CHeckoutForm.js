import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
  const [cardError, setCardError ] = useState(null);
  const [cardMethod, setCardMethod] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
      setCardError (error.message);
      setCardMethod(null);
    }
    else{
      setCardMethod(paymentMethod);
      const payment = {id: paymentMethod.id, last4: paymentMethod.card.last4}
      props.handlePlaceOrder(payment);
      setCardError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        cardError && <p style={{color: 'red'}}>{cardError}</p>
      }
      {
        cardMethod && <p style={{color: 'green'}}>Payment Successful</p>
      }
    </form>
  );
};

export default CheckoutForm;