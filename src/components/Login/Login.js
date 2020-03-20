import React from 'react';
import Auth from './useAuth';


const Login = () => {
    const auth = Auth();
    console.log(auth.signInWithGoogle);

    return (
        <div>
            <h1>Join Me</h1>
            {
                auth.user ?  <button onClick={auth.signOut}>Sign out</button> : 
            <button onClick={auth.signInWithGoogle}>Sign in with google</button>
                }
        </div>
    );
};

export default Login; 