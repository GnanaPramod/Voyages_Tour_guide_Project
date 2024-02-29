import React from 'react';
import Logo from './Logo';
import {Link} from "react-router-dom";

function Header(){
    
  
      
    
    return (<div id = "headsec">
        <div id = "logoname">Voyages</div>
        <Logo/>
        <input id = "searchBar" type = "text" placeholder=' 🔍 Enter Location'/>
        <Link id = "home" to ="/">Home</Link>
        <Link id = "signup" to = "/signup">Sign Out</Link>
        <Link id ="signin" to ="/signincom">Sign In</Link>
        <Link  id = "about" to ="/signupcom">About</Link>
        <Link id = "contactus" to = "/contact">Contact Us</Link>
       
    </div>);
}
export default Header;