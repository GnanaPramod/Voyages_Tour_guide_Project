import React from 'react';
import { Link } from 'react-router-dom';
function SigCom(){
   
    return (
        <div>
            <Link to = "/signupcom/usrsignup">Sign Up as User</Link><br/>
            <Link to = "/signupcom/mngrsignup">Sign Up as Manager</Link><br/>
            <Link to = "/signupcom/guidesignup">Sign Up as Guide</Link><br/>
        </div>
        
    );
}
export default SigCom;