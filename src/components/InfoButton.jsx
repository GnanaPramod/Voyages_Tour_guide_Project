import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom';
function InfoButton(props){
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.setItem('locname', props.name);
        navigate(`/tourpage/${props.name}`);
    };
    const [isMouse, setMouse] = useState(false);
    //const [state, setState] = useState(<App/>)
    function handleMouseOver(){
        setMouse(true);
    }
    function handleMouseOut(){
        setMouse(false);
    }
    //function handleState(){
       // setState(<Web/>);
    //}
    return (
        <button onClick={handleClick} style = {{backgroundColor:isMouse?"#ffa500":"white"}} onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}  id = "plcs">
            <div>{props.username}</div>
            <div>{props.timestamp}</div>
            <div>{props.days}</div>
        </button>
    );
}
export default InfoButton;