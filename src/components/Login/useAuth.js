import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseconfig";
import { useState, createContext } from "react";


    firebase.initializeApp(firebaseConfig);

 const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider vlaue={auth}> {props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

const Auth = () => {

    const[user, setUser] = useState(null);
    
    
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();  
        firebase.auth().signInWithPopup(provider)
        .then(res=> {
            const {displayName, email, photoURL} = res.user;
            const signedInUser ={
                name: displayName,
                email: email,
                photo: photoURL,
            }
            setUser(signedInUser);
            return res.user;
        })
        .catch(err=>{
            console.log(err);
            setUser(null);
            return err.message;
        })
    }
    const signOut = () => {
        firebase.auth().signOut().then(function(){
            setUser(null);
        })
        .catch(function(error){

        });
    }
    return {
        user,
        signInWithGoogle,
        signOut
    }

}

export default Auth;