import React from 'react';
import { Link } from 'react-router-dom';
import './SignInLinks.css';
function SignInCom(){
    return(
    <div className="signin-links">
    <Link to="/signincom/usrsignin" className="signin-link">Sign In as User</Link>
    <Link to="/signincom/mgrsignin" className="signin-link">Sign In as Manager</Link>
    <Link to="/signincom/guidesignin" className="signin-link">Sign In as Guide</Link>
  </div>
        
    )
}
export default SignInCom;
