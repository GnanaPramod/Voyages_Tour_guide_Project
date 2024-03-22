import React from 'react';
//import {useState, useEffect} from 'react';
import Logo from './Logo';
//import axios from 'axios';
//import axios from 'axios';
import {Link} from "react-router-dom";

function Header(){
  
    return (<div id = "headsec">
        <div id = "logoname">Voyages</div>
        <Logo/>
        <div>
        
      
        
      </div>
        
        <Link id = "home" to ="/">Home</Link>
        <Link id = "signup" to = "/signupcom">Sign Up</Link>
        <Link id ="signin" to ="/signincom">Sign In</Link>
        <Link  id = "about" to ="/about">About</Link>
        <Link id = "contactus" to = "/contact">Contact Us</Link>
        <Link id = "review" to = "/viewreview">Reviews</Link>
       
    </div>);
}
export default Header;