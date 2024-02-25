import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom';
function Places(props){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/tourpage');
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
            <img id = "img1" src = {props.img} alt = "logo"/>
            <div id = "plcnm">
                {props.name}
            </div>
            <div id = "subnm">{props.info}</div>
        </button>
    );
}
export default Places;