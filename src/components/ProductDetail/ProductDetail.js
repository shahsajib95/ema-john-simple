import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';

const ProductDetail = () => {
    const {productkey} = useParams()
    const [product, setProduct] = useState(null);
    
    useEffect(()=>{
        fetch('https://thawing-beyond-34551.herokuapp.com/product/'+ productkey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
        })
    }, [productkey])
   
    console.log(product)
    return (
        <div>
            <h1>Product Details</h1>
            {
                product && <Product showAddToCart ={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;