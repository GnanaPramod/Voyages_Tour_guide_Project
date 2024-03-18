import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpLinks.css';
function SigCom(){
   
    return (
        <div className="signup-links">
            <Link className="signup-link" to = "/signupcom/usrsignup">Sign Up as User</Link><br/>
            <Link className="signup-link" to = "/signupcom/mngrsignup">Sign Up as Manager</Link><br/>
            <Link className="signup-link" to = "/signupcom/guidesignup">Sign Up as Guide</Link><br/>
        </div>
        
    );
}
export default SigCom;