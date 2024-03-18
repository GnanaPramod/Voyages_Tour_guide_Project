// InfoButton.js
/** 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GuideUsrInfo() {
  const [tourRequirements, setTourRequirements] = useState([]);

  useEffect(() => {
    async function fetchTourRequirements() {
      try {
        const response = await axios.get('http://localhost:5000/api/tourRequirements');
        setTourRequirements(response.data);
      } catch (error) {
        console.error('Error fetching tour requirements:', error);
      }
    }
    fetchTourRequirements();
  }, []);

  return (
    <div>
      <h2>Tour Requirements</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>User ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Phone Number</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Location Name</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Days</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>From Date</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>To Date</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Budget</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Places</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tourRequirements.map((requirement, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{requirement.userid}</td>
              <td style={{ padding: '8px' }}>{requirement.username}</td>
              <td style={{ padding: '8px' }}>{requirement.usrphno}</td>
              <td style={{ padding: '8px' }}>{requirement.email}</td>
              <td style={{ padding: '8px' }}>{requirement.locname}</td>
              <td style={{ padding: '8px' }}>{requirement.days}</td>
              <td style={{ padding: '8px' }}>{requirement.fromdate}</td>
              <td style={{ padding: '8px' }}>{requirement.todate}</td>
              <td style={{ padding: '8px' }}>{requirement.bdgt}</td>
              <td style={{ padding: '8px' }}>{requirement.plcs}</td>
              <td style={{ padding: '8px' }}>{requirement.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuideUsrInfo;**/

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// function GuideUsrInfo() {
//   const [tourRequirements, setTourRequirements] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchTourRequirements() {
//       try {
//         const response = await axios.get(`http://localhost:5000/tourRequirements?locname=${searchTerm}`);
//         setTourRequirements(response.data);
//       } catch (error) {
//         console.error('Error fetching tour requirements:', error);
//       }
//     }
//     fetchTourRequirements();
//   }, [searchTerm]); // Fetch data whenever searchTerm changes

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };
//   /**const handleCheckboxChange = (requirementId) => {
//     // Update the state of the corresponding checkbox
//     setTourRequirements(prevRequirements =>
//       prevRequirements.map(requirement =>
//         requirement._id === requirementId
//           ? { ...requirement, checked: !requirement.checked }
//           : requirement
//       )
//     );
//   };**/
//   const handleCheckboxChange = (requirementId) => {
//     // Update the state of the corresponding checkbox and change row color to green if checkbox is checked
//     setTourRequirements(prevRequirements =>
//       prevRequirements.map(requirement =>
//         requirement._id === requirementId
//           ? { ...requirement, checked: !requirement.checked, rowColor: requirement.checked ? '' : 'lightgreen' }
//           : requirement
//       )
//     );
//   };
//   function handlePlnBtn(){
//     navigate("/guideplans");
//   }
//   return (
//     <div>
//       <h2>Tour Requirements</h2>
//       <button onClick = {handlePlnBtn}>Send Plans</button>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         placeholder="Search by Location Name"
//       />
      
//       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//         {/* Table headers */}
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Username</th>
//             <th>Phone Number</th>
//             <th>Email</th>
//             <th>Location Name</th>
//             <th>Days</th>
//             <th>From Date</th>
//             <th>To Date</th>
//             <th>Budget</th>
//             <th>Places</th>
//             <th>Timestamp</th>
//           </tr>
//         </thead>
//         {/* Table body */}
//         <tbody>
//           {tourRequirements.map((requirement) => (
//             <tr key={requirement._id}>
//               <td>{requirement.userid}</td>
//               <td>{requirement.username}</td>
//               <td>{requirement.usrphno}</td>
//               <td>{requirement.email}</td>
//               <td>{requirement.locname}</td>
//               <td>{requirement.days}</td>
//               <td>{requirement.fromdate}</td>
//               <td>{requirement.todate}</td>
//               <td>{requirement.bdgt}</td>
//               <td>{requirement.plcs}</td>
//               <td>{requirement.timestamp}</td>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={requirement.checked || false}
//                   onChange={() => handleCheckboxChange(requirement._id)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default GuideUsrInfo;
// GuideUsrInfo.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GuideUsrInfo.css'; // Importing the CSS file

function GuideUsrInfo() {
  const [tourRequirements, setTourRequirements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTourRequirements() {
      try {
        const response = await axios.get(`http://localhost:5000/tourRequirements?locname=${searchTerm}`);
        setTourRequirements(response.data);
      } catch (error) {
        console.error('Error fetching tour requirements:', error);
      }
    }
    fetchTourRequirements();
  }, [searchTerm]); // Fetch data whenever searchTerm changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (requirementId) => {
    // Update the state of the corresponding checkbox and change row color to green if checkbox is checked
    setTourRequirements(prevRequirements =>
      prevRequirements.map(requirement =>
        requirement._id === requirementId
          ? { ...requirement, checked: !requirement.checked, rowColor: requirement.checked ? '' : 'lightgreen' }
          : requirement
      )
    );
  };

  function handlePlnBtn() {
    navigate("/guideplans");
  }

  return (
    <div className="guide-usr-info-container">
      <h2 className="guide-usr-info-heading">Tour Requirements</h2>
      <button className="guide-usr-info-btn" onClick={handlePlnBtn}>Send Plans</button>
      <input
        className="guide-usr-info-search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by Location Name"
      />
      
      <table className="guide-usr-info-table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Location Name</th>
            <th>Days</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Budget</th>
            <th>Places</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tourRequirements.map((requirement) => (
            <tr key={requirement._id} style={{ backgroundColor: requirement.rowColor }}>
              <td>{requirement.userid}</td>
              <td>{requirement.username}</td>
              <td>{requirement.usrphno}</td>
              <td>{requirement.email}</td>
              <td>{requirement.locname}</td>
              <td>{requirement.days}</td>
              <td>{requirement.fromdate}</td>
              <td>{requirement.todate}</td>
              <td>{requirement.bdgt}</td>
              <td>{requirement.plcs}</td>
              <td>{requirement.timestamp}</td>
              <td>
                <input
                  type="checkbox"
                  className="guide-usr-info-checkbox"
                  checked={requirement.checked || false}
                  onChange={() => handleCheckboxChange(requirement._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuideUsrInfo;

