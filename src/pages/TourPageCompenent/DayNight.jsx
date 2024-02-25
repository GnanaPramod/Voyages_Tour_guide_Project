import React, { useState } from 'react';
import img1 from '../../../src/components/imgs/araku.webp';
import img2 from '../../components/imgs/kerala.jpg';
function DayNight(){
    const [dragging, setDragging] = useState(false);
    const [offsetY, setOffsetY] = useState(window.innerHeight / 2);
  
    const handleMouseDown = (e) => {
      setDragging(true);
      setOffsetY(e.clientY);
    };
  
    const handleMouseUp = () => {
      setDragging(false);
    };
  
    const handleMouseMove = (e) => {
      if (dragging) {
        const newOffsetY = e.clientY;
        setOffsetY(newOffsetY);
      }
    };
  
    return (
      <div className="App"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="top-image" style={{ height: offsetY }}>
          {/* Your top image */}
          <img src={img1} alt="Top" />
        </div>
        <div className="dragging-column" style={{ top: offsetY }}></div>
        <div className="bottom-image" style={{ marginTop: offsetY }}>
          {/* Your bottom image */}
          <img src={img2} alt="Bottom" />
        </div>
      </div>
    );
}
export default DayNight;


  