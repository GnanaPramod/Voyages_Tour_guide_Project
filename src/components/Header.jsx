import React from 'react';
import Logo from './Logo';
import {Link} from "react-router-dom";

function Header(){
    return (<div id = "headsec">
        <div id = "logoname">Voyages</div>
        <Logo/>
        <input id = "searchBar" type = "text" placeholder=' 🔍 Enter Location'/>
        <Link id = "home" to ="/">Home</Link>
        
        <a id = "signup" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Sign Up</a>
        <a id ="signin" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Sign In</a>
        <a id ="signin" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Sign In</a>
        <Link  id = "about" to ="/about">About</Link>
        <Link id = "contactus" to = "/contact">Contact Us</Link>
       
    </div>);
}
export default Header;