import React, {useEffect, useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData/';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {


    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

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
    thankYou = <img src={happyImage} alt=""></img>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
        
           { cart.map(pd => <ReviewItem 
           key={pd.key} RemoveProduct={RemoveProduct}
           product={pd}></ReviewItem>)
        }
        {
            thankYou
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
                           <buttom className="main-button">Proceed Checkout</buttom> :
                           <buttom className="main-button"> Log in to Proceed</buttom>
                       }
                       </Link>
               </Cart>
               </div>
           
        </div>
    );
};

export default Review;