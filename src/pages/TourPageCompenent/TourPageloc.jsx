// TourPage.js
/**(1)import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourPageloc() {
    const [tourDetails, setTourDetails] = useState(null);
    const [error, setError] = useState(null);
    const locname = localStorage.getItem('locname'); 
    useEffect(() => {
        console.log(locname);
        axios.get(`http://localhost:5000/tours/${locname}`)
            .then(response => {
                setTourDetails(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [locname]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tourDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tourDetails.locname}</h2>
            <p>Description: {tourDetails.description}</p>
            <p>Places to visit: {tourDetails.places}</p>
            <p>Days required: {tourDetails.days}</p>
            <p>Budget: {tourDetails.budget}</p>
        </div>
    );
}

export default TourPageloc;**/
// TourPageloc.js
/**(2) original one 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function TourPageloc() {
    const navigate = useNavigate();
    const [tourDetails, setTourDetails] = useState(null);
    const [error, setError] = useState(null);
    function handleBtn(){
        navigate('/tourpage');
    }
    useEffect(() => {
        const locname = localStorage.getItem('locname');
        if (!locname) {
            setError("Location name not found in localStorage");
            return;
        }

        axios.get(`http://localhost:5000/tours/${locname}`)
            .then(response => {
                setTourDetails(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tourDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tourDetails.locname}</h2>
            <p>Images:</p>
            <div>
              {tourDetails.images.map(image => (
                <img key={image} src={`http://localhost:5000/uploads/${image}`} alt={image} style={{ maxWidth: '200px', margin: '5px' }} />
              ))}
            </div>
            <p>Description: {tourDetails.description}</p>
            <p>Places to visit: {tourDetails.places}</p>
            <p>Days required: {tourDetails.days}</p>
            <p>Budget: {tourDetails.budget}</p>
            <button onClick={handleBtn}>Get Guide</button>
        </div>
    );
}

export default TourPageloc;**/
// TourPage.js
/**(1)import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourPageloc() {
    const [tourDetails, setTourDetails] = useState(null);
    const [error, setError] = useState(null);
    const locname = localStorage.getItem('locname'); 
    useEffect(() => {
        console.log(locname);
        axios.get(`http://localhost:5000/tours/${locname}`)
            .then(response => {
                setTourDetails(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [locname]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tourDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tourDetails.locname}</h2>
            <p>Description: {tourDetails.description}</p>
            <p>Places to visit: {tourDetails.places}</p>
            <p>Days required: {tourDetails.days}</p>
            <p>Budget: {tourDetails.budget}</p>
        </div>
    );
}

export default TourPageloc;**/
// TourPageloc.js
/**(2) original one 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function TourPageloc() {
    const navigate = useNavigate();
    const [tourDetails, setTourDetails] = useState(null);
    const [error, setError] = useState(null);
    function handleBtn(){
        navigate('/tourpage');
    }
    useEffect(() => {
        const locname = localStorage.getItem('locname');
        if (!locname) {
            setError("Location name not found in localStorage");
            return;
        }

        axios.get(`http://localhost:5000/tours/${locname}`)
            .then(response => {
                setTourDetails(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tourDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tourDetails.locname}</h2>
            <p>Images:</p>
            <div>
              {tourDetails.images.map(image => (
                <img key={image} src={`http://localhost:5000/uploads/${image}`} alt={image} style={{ maxWidth: '200px', margin: '5px' }} />
              ))}
            </div>
            <p>Description: {tourDetails.description}</p>
            <p>Places to visit: {tourDetails.places}</p>
            <p>Days required: {tourDetails.days}</p>
            <p>Budget: {tourDetails.budget}</p>
            <button onClick={handleBtn}>Get Guide</button>
        </div>
    );
}

export default TourPageloc;**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TourPageloc.css'; // Import your CSS file for styling
import ImageSliderLocation from './ImageSliderLocation'; // Assuming you have this component

function TourPageloc() {
  const navigate = useNavigate();
  const [tourDetails, setTourDetails] = useState(null);
  const [error, setError] = useState(null);

  function handleBtn() {
    navigate('/tourpage');
  }

  useEffect(() => {
    const locname = localStorage.getItem('locname');
    if (!locname) {
      setError("Location name not found in localStorage");
      return;
    }

    axios.get(`http://localhost:5000/tours/${locname}`)
      .then(response => {
        setTourDetails(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="tour-page error">Error: {error}</div>;
  }

  if (!tourDetails) {
    return <div className="tour-page loading">Loading...</div>;
  }
const dayWiseDetails=tourDetails.description.split('\n');
  return (
    <div className="tour-page">
      <h2>{tourDetails.locname}</h2>
      <ImageSliderLocation slides={tourDetails.images.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))} />
      <div>
         <p className="des">Description:</p>
         {dayWiseDetails.map((detail,index)=>(
            <p key={index}>{detail}</p>
         ))}
      </div>
      <p className="des">Places to visit:</p> {tourDetails.places}
      <p className="des">Days required</p>{tourDetails.days}
      <p className="des">Budget:</p> {tourDetails.budget}
      <button className="get-guide-button" onClick={handleBtn}>Get Guide</button>
    </div>
  );
}

export default TourPageloc;


// TourPageloc.js
/**(3)import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourPageloc() {
    const [tourDetails, setTourDetails] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const locname = localStorage.getItem('locname');
        if (!locname) {
            setError("Location name not found in localStorage");
            return;
        }

        axios.get(`http://localhost:5000/tours/${locname}`)
            .then(response => {
                setTourDetails(response.data);
            })
            .catch(error => {
                setError(error.message);
            });

        axios.get(`http://localhost:5000/tours/${locname}/images`)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tourDetails || images.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tourDetails.locname}</h2>
            <p>Description: {tourDetails.description}</p>
            <p>Places to visit: {tourDetails.places}</p>
            <p>Days required: {tourDetails.days}</p>
            <p>Budget: {tourDetails.budget}</p>
            <h3>Images:</h3>
            
        </div>
    );
}

export default TourPageloc;**/




// TourPageloc.js
/**(3)import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourPageloc() {
    const [tourDetails, setTourDetails] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const locname = localStorage.getItem('locname');
        if (!locname) {
            setError("Location name not found in localStorage");
            return;
        }

        axios.get(`http://localhost:5000/tours/${locname}`)
            .then(response => {
                setTourDetails(response.data);
            })
            .catch(error => {
                setError(error.message);
            });

        axios.get(`http://localhost:5000/tours/${locname}/images`)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tourDetails || images.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{tourDetails.locname}</h2>
            <p>Description: {tourDetails.description}</p>
            <p>Places to visit: {tourDetails.places}</p>
            <p>Days required: {tourDetails.days}</p>
            <p>Budget: {tourDetails.budget}</p>
            <h3>Images:</h3>
            
        </div>
    );
}

export default TourPageloc;**/


