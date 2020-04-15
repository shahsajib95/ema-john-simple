import React from 'react';
import fakeData from '../../fakeData';


const Inventory = () => {
    const handleInventory = () => {
        // const product = fakeData;
        // console.log('before add', product );
        // fetch('http://localhost:4200/addProduct ',  {
        // method : 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(product) // body data type must match "Content-Type" header
        // })
        // .then(res=>res.josn())
        // .then(data=>{
        //     console.log('Added to DB', data)
        // })
    }
    return (
        <div>
            <h1>Add Inventory to sell more...</h1>
            <button onClick={handleInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;