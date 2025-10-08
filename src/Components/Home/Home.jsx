import React from 'react';
import Items from '../Items/Items';
import Login from '../Login/Login';
import { useAuth } from '../../Auth/AuthContext';

const Home = () => {
    const { user } = useAuth();
    console.log(user);
    if (user) {
        return window.location.href = "/Items";;
    }else {
        return window.location.href = "/login";;
    }
    
};

export default Home;