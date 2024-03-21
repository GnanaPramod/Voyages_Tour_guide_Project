import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import About from "../src/pages/About.js";
import Contact from "../src/pages/Contact.js";
import TourPage from "../src/pages/TourPage.js";
import SignUp from './pages/SignUp.js';
import Success from '../src/pages/Success.js';
import Manager from '../src/pages/Manager.js';
import SigCom from '../src/pages/SigCom.js';
import UsrSignUp from './pages/SignUpPages/UsrSignUp.js';
import MngrSignUp from './pages/SignUpPages/MngrSignUp.js';
import GuideSignUp from './pages/SignUpPages/GuideSignUp.js';
import SignInCom from './pages/SignInCom.js';
import MgrSignIn from './pages/SignInPages/MgrSignIn.js';
import UsrSignIn from './pages/SignInPages/UsrSignIn.js';
import GuideSignIn from './pages/SignInPages/GuideSignIn.js';
import UserIntf from './pages/UserIntf.js';
import UsrResetPwd from './pages/PasswordReset/UsrResetPwd.js';
import GuideResetPwd from './pages/PasswordReset/GuideResetPwd.js';
import MgrResetPwd from './pages/PasswordReset/MgrResetPwd.js';
import MangrUpload from './pages/ManagerPages/MangrUpload.jsx';
import Guide from './pages/Guide.js';
import TourPgInfo from './pages/TourPageCompenent/TourPgInfo.jsx';
import TourPageloc from './pages/TourPageCompenent/TourPageloc.jsx';
import GuideUsrInfo from './pages/GuidePages/GuideUsrInfo.jsx';
import GuidePlans from './pages/GuidePages/GuidePlans.jsx';
import TourPlanDetails from './pages/UserCom/TourPlanDetails.jsx';
import ConfirmedPlanDetails from './pages/UserCom/ConfirmedPlanDetails.jsx';
import ConfirmedUsrGuidePlan from './pages/GuidePages/ConfirmedUsrGuidePlan.jsx';
import ComplaintForm from './pages/UserCom/ComplaintForm.jsx';
import Managercomp from './pages/ManagerPages/Managercomp.jsx';
import Review from './pages/UserCom/Review.jsx';
import ViewReview from './pages/UserCom/ViewReview.jsx';
const router = createBrowserRouter([
   {
      path:"/",
      element:<App/>
   },
   {
      path:"/about",
      element: <About/>
   },
   {
      path:"/viewreview",
      element:<ViewReview/>
   },
   { 
      path:"/complaintform",
      element:<ComplaintForm/>

   },
   {
      path:"/user/review",
      element:<Review/>
   },
   {
      path:"/manager/complaint",
      element:<Managercomp/>
   },
   {
      path:"/confirmeddetails",
      element:<ConfirmedPlanDetails/>
   },
   {
      path:"/confirmedusrguideplan",
      element:<ConfirmedUsrGuidePlan/>
   },
   {
      path:"/usrtoinfo",
      element:<GuideUsrInfo/>
   },
   {
      path:"/contact",
      element: <Contact/>
   },
   {
      path:"/tourplandetails",
      element:<TourPlanDetails/>
   },
   {
      path:"/tourpage/:locationName",
      element:<TourPageloc/>
   },
   {
      path:"/tourpage",
      element: <TourPage/>
   },
   {
      path:"/guideplans",
      element:<GuidePlans/>
   },
   {
      path:"/signup",
      element:<SignUp/>
   },
   {
      path:"/tourpage/success",
      element:<Success/>
   },
   {
      path:"/tourpginfo",
      element:<TourPgInfo/>
   },
   {
      path:"/manager",
      element:<Manager/>
   },
   {
      path:"/manager/upload",
      element:<MangrUpload/>
   },
   {
      path:"/guide",
      element:<Guide/>
   },
   {
      path:"/signupcom",
      element:<SigCom/>
   },
   {
      path:"/signupcom/usrsignup",
      element:<UsrSignUp/>
   },
   {
      path:"/signupcom/mngrsignup",
      element:<MngrSignUp/>
   },
   {
      path:"/signupcom/guidesignup",
      element:<GuideSignUp/>
   },
   {
      path:"/signincom",
      element:<SignInCom/>

   },
   {
      path:"/signincom/usrsignin",
      element:<UsrSignIn/>
   },
   {
      path:"/signincom/mgrsignin",
      element:<MgrSignIn/>
   },
   {
      path:"/signincom/guidesignin",
      element:<GuideSignIn/>
   },
   {
      path:"/userintf",
      element:<UserIntf/>
   },
   {
      path:"/signincom/pwdresetusr",
      element:<UsrResetPwd/>
   },
   {
      path:"/signincom/pwdresetmgr",
      element:<MgrResetPwd/>
   },
   {
      path:"/signincom/pwdresetguide",
      element:<GuideResetPwd/>
   }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider router = {router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

