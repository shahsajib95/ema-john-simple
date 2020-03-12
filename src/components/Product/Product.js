import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Product = (props) => {

    const { img, name, seller, price, stock } = props.product;
    return (
        <div class="product">
            <div>
                <img src={img}/>
            </div>
            <div >
                <h4 class="product-name">{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button class="main-button"
                    onClick={() =>props.handleAddProduct(props.product)}
                >
                    
                    <FontAwesomeIcon icon={faShoppingCart} /> add to Cart</button>
            </div>

        </div>
    );
};

export default Product;