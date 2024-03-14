import React, {useState, useEffect} from 'react';
import Header from './Header';
import Places from './Places';
import axios from 'axios';
import img1 from './imgs/gokarna.jpeg';
import img2 from './imgs/charminar.jpg';
import img3 from './imgs/araku.webp';
import img4 from './imgs/ooty.jpeg';
import img5 from './imgs/vizag.jpeg';
import img6 from './imgs/kerala.jpg';
import img7 from './imgs/manali.jpeg';
import img8 from './imgs/pondicherry.webp';
import Slider from './Slider'
function App(){
    const [tours, setTours] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    axios.get('http://localhost:5000/tours')
       .then(response => {
        setTours(response.data);
       })
       .catch(error => {
        setError(error.message);
       });
    }, []);
    return (
        <div>
            <Header/><br/><br/>
            <Slider/>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {tours.map(tour => (
    <div key={tour.id} style={{ flex: '0 0 0 calc(0% - 0px)', margin: '1px' }}>
      {tour.images.length > 0 ? (
        <Places
          img={`http://localhost:5000/uploads/${tour.images[0]}`}  // Using the first image from the array
          name={tour.locname}
          info={' '}
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  ))}
</div>

      
            <Places img = {img1} name = 'Gokarna' info = 'Gokarna, Northwest Karnantaka, India'/>
            <Places img = {img2} name = 'Hyderabad' info ='Hyderabad, Telanagana, India'/>
            <Places img = {img3} name = 'Araku' info = 'Araku, Andhra Pradesh, India'/>
            <Places img = {img4} name = 'Ooty' info = 'Udagamandalam(ooty), Tamilnadu, India' /><br/>
            <Places img = {img5} name = 'Vizag' info = 'Vishakapatnam, Andhra Pradesh, India'/>
            <Places img = {img6} name = 'Kerala' info = 'Kerala, India'/>
            <Places img = {img7} name = 'Manali' info = 'Mnanali, Himachal Pradesh, India'/>
            <Places img = {img8} name = 'Pondicherry' info = 'Pondicherry, India'/>
        </div>  
    );
}
export default App;