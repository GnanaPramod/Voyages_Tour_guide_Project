import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import About from "../src/pages/About.js";
import Contact from "../src/pages/Contact.js";
import TourPage from "../src/pages/TourPage.js";
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
      path:"/contact",
      element: <Contact/>
   },
   {
      path:"/tourpage",
      element: <TourPage/>
   }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider router = {router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

