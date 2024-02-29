import React from 'react';
import { Link } from 'react-router-dom';
function SignInCom(){
    return (
        <div>
            <Link to= "/signincom/usrsignin">Sign In as User</Link>
            <Link to= "/signincom/mgrsignin">Sign In as Manager</Link>
            <Link to= "/signincom/guidesignin">Sign In as Guide</Link>
        </div>
        
    )
}
export default SignInCom;
