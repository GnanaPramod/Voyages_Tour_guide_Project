import ImageSlider from "./ImageSlider.jsx";
import img1 from './imgs/pondicherry.webp';
import img2 from './imgs/charminar.jpg';
import img3 from './imgs/kerala.jpg';


const App = () => {
  const slides = [
    { url: img1, title: "beach" },
    { url: img2, title: "boat" },
    { url:img3, title: "forest" },
    
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default App;