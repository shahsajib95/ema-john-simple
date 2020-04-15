import React from 'react';
import { useForm } from 'react-hook-form';
import {  } from './Ship.css'; 
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import { Elements,} from '@stripe/react-stripe-js';
import CheckoutForm from '../Checkoutform/CheckoutForm'
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';

const Ship = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const auth = useAuth();

    const stripePromise = loadStripe('pk_test_pS06V8JIFXeKVNV03PxEcd3Y00uNbBWVhq');

    const onSubmit = data => { 
  
      setShipInfo(data );
      // console.log('order placed', order)
      // alert('Successfully placed order with order Id' + order._id)
      // processOrder();
  }
  const handlePlaceOrder  = (payment) =>{
    // TODO: move this after payment
    const savedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email, 
      cart: savedCart,
      ship: shipInfo,
      payment : payment
    };
    fetch('http://localhost:4200/placeOrder',{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
  })
  
  .then(res=>res.json())
  .then(order=>{
    //clear LocalStorage cart
    setOrderId(order._id)
    processOrder();

    //give thanks to user


  })
  }
 
    return (
  
      <div className="container">
        <div className="row">
          <div style={{display: shipInfo && 'none'}}className="col-md-6">
            <h3>Shipment Information</h3>
          <form  className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">Name is required</span>}
        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email"/>
        {errors.email && <span className="error">Email is required</span>}
        <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
        {errors.AddressLine1 && <span className="error">Address is required</span>}
        <input name="AddressLine2" ref={register} placeholder="Address Line 2"/>
        <input name="city" ref={register({ required: true })} placeholder="City" />
        {errors.city && <span className="error">City is required</span>}
        <input name="country" ref={register({ required: true })}  placeholder="Country"/>
        {errors.country && <span className="error">Country is required</span>}
        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
        {errors.zip && <span className="error">zip code is required</span>}
        <input type="submit" />
      </form>
          </div>
          <div style={{display: shipInfo ? 'block' : 'none'}}className="col-md-6">
          <h3>Payment Information</h3>
            <Elements stripe={stripePromise}>
           <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
           </Elements>
           <br/>
      {
        orderId && 
        <div>
        <h3>Thanks For Shopping</h3>
        <p>Your order ID is: {orderId} </p>
        </div>
      }
          </div>
        </div>
      </div>
    )
};

export default Ship;