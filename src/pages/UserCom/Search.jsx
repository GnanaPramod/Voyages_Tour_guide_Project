import React from "react"
import "./Search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as goldenstar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot as location  } from "@fortawesome/free-solid-svg-icons"; 

import img1 from './userimg/IndianGate.jpg';
import img2 from './userimg/lotusTemple.jpg';
import img3 from './userimg/goldenTemple.jpg';
import img4 from './userimg/mysorepalace.jpg';
import img5 from './userimg/Tajmahal.jpg';



function Search(){
    return(
          <div>
          <div className="container">
            <FontAwesomeIcon icon={location} beat flip="horizontal" size="xl"style={{color: "#74C0FC",}} />
            <input type="text" placeholder="Enter Location" />
            <button className="search">Search</button>
            <button className="subscribe">Subscribe<FontAwesomeIcon icon={goldenstar} fade size="2xl" style={{color: "#080808",}} /></button>
          </div>
          <div className="usrimg">
             <button><img src={img1} alt="Tourist place"/><br></br>Indian Gate</button>
             <button><img src={img2} alt="Tourist place"/> <br></br>Lotus Temple</button>
             <button><img src={img3} alt="Tourist place"/><br></br> Golden Temple</button>
             <button><img src={img4} alt="Tourist place"/><br></br>Mysore Palace</button>
             <button><img src={img5} alt="Tourist place"/><br></br>Tajmahal</button>

          </div>
          </div>
        
    );
}
export default Search;