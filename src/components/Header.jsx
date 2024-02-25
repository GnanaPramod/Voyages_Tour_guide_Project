import React from 'react';
import Logo from './Logo';
function Header(){
    return (<div id = "headsec">
        <div id = "logoname">Voyages</div>
        <Logo/>
        <a id = "home" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Home</a>
        <a id = "signup" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Sign Up</a>
        <a id ="signin" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Sign In</a>
        <a id ="signin" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Sign In</a>
        <a id = "about" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">About</a>
        <a id = "contactus" href = "https://chat.openai.com/c/cbc07fc0-8e30-4249-8ca2-03b7b04e0a00">Contact Us</a>
    </div>);
}
export default Header;