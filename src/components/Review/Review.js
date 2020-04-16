import React, {useEffect, useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {

    
    const [cart, setCart] = useState([]);
    const auth = useAuth();

    const RemoveProduct = (productkey) =>{
        const newCart = cart.filter(pd=> pd.key !== productkey)
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        fetch('https://thawing-beyond-34551.herokuapp.com/getProductsByKey',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productKeys) // body data type must match "Content-Type" header
      })
        .then(res=>res.json())
        .then(data=>{
            const cartProducts =  productKeys.map( key => {
                const product = data.find( pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        })
       
    }, []);

  
    return (
        <div className="twin-container">
            <div className="product-container">
        
           { cart.map(pd => <ReviewItem 
           key={pd.key} RemoveProduct={RemoveProduct}
           product={pd}></ReviewItem>)
        }
     
        {
            !cart.length && <h1>Cart is Empty <a href="/shop">Keep Shoping</a></h1>
        }
    
           </div>
            
           <div className="cart-container">
               <Cart cart={cart}>
                   <Link to="ship">
                       {
                           auth.user ? 
                           <button className="main-button">Proceed Checkout</button> :
                           <button className="main-button"> Log in to Proceed</button>
                       }
                       </Link>
               </Cart>
               </div>
           
        </div>
    );
};

export default Review;