import React, {useEffect, useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData/';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {


    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOreder = () => {
        
        setCart ([]);
        setOrderPlaced(true);
        processOrder();
    }

    const RemoveProduct = (productkey) =>{
        const newCart = cart.filter(pd=> pd.key !== productkey)
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts =  productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

   let thankYou;
    if(orderPlaced){
    thankYou = <img src={happyImage}></img>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            <h1>Cart Items : {cart.length}</h1>
           { cart.map(pd => <ReviewItem 
           key={pd.key} RemoveProduct={RemoveProduct}
           product={pd}></ReviewItem>)
        }
        {
            thankYou
        }
    
           </div>
            
           <div className="cart-container">
               <Cart cart={cart}>
                   <buttom onClick={handlePlaceOreder} className="main-button">Place Order</buttom>
               </Cart>
               </div>
           
        </div>
    );
};

export default Review;