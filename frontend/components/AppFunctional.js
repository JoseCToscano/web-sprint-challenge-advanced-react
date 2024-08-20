import React, { useState } from 'react'
import axios from "axios";


const positionMap = {
    "0": {x: 1, y: 1},
    "1": {x: 2, y: 1},
    "2": {x: 3, y: 1},
    "3": {x: 1, y: 2},
    "4": {x: 2, y: 2},
    "5": {x: 3, y: 2},
    "6": {x: 1, y: 3},
    "7": {x: 2, y: 3},
    "8": {x: 3, y: 3},
}

function plurify(count, word){
    return count === 1 ? word :`${word}s`;
}
export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
    const [stepCount, setStepCount] = useState(0);
    const [positionX, setPositionX] = useState(2);
    const [positionY, setPositionY] = useState(2);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");


  // Resets pack to origin (2, 2)
    function reset() {
        setStepCount(0);
        setPositionX(2);
        setPositionY(2);
        setMessage("");
        setEmail("");
    }

    function trackMove(){
        setStepCount(step => step + 1);
        setMessage("");
    }

    function moveUp(){
      // "Y" can only be "reduced" (go up) if it is greater than 1
        if(positionY > 1){
            setPositionY(y=> y-1);
            trackMove();
      }else {
            setMessage("You can't go up");
      }
    }

  function moveDown(){
      // "Y" can only be "increased" (go down) if it is less than 3
      if(positionY < 3){
          setPositionY(y=> y+1);
          trackMove();
      }else {
            setMessage("You can't go down");
      }
  }

  function moveRight(){
      // "X" can only be "increased" (go right) if it is less than 1
      if(positionX < 3){
          setPositionX(x=> x+1);
          trackMove();
      }else{
            setMessage("You can't go right");
      }
  }

  function moveLeft(){
      // "X" can only be "reduced" (go left) if it is greater than 1
      if(positionX > 1){
          setPositionX(x=> x-1);
          trackMove();
      }else{
            setMessage("You can't go left");
      }
  }

  function isSelected(index) {
        const { x, y } = positionMap[`${index}`];
      return x === positionX && y === positionY;
  }


  function onSubmit(evt) {
    evt.preventDefault();
    const payload = {
        "x": positionX,
        "y": positionY,
        "steps": stepCount,
        email
    };
    axios.post('http://localhost:9000/api/result', payload)
        .then((response) => {
        setMessage(response.data.message);
        setEmail("");
    }).catch((error) => {
        if (error?.response?.data?.message) {
            setMessage(error.response.data.message);
        } else if(typeof error?.message === 'string'){
            // Something happened in setting up the request that triggered an Error
            setMessage(error.message);
        }else{
            setMessage("An error occurred");
        }
    });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({positionX}, {positionY})</h3>
        <h3 id="steps">You moved {stepCount} {plurify(stepCount, 'time')}</h3>
      </div>
      <div id="grid">
          {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
                  <div key={idx} className={`square${isSelected(idx) ? ' active' : ''}`}>
                        {isSelected(idx) ? 'B' : null}
                  </div>
              ))
          }
      </div>
      <div className="info">
        <h3 id="message">
            {message}
        </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={moveLeft}>LEFT</button>
        <button id="up" onClick={moveUp}>UP</button>
        <button id="right" onClick={moveRight}>RIGHT</button>
        <button id="down" onClick={moveDown}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" value={email}
               onChange={(e)=>setEmail(e.target.value)}
               placeholder="type email">

        </input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
