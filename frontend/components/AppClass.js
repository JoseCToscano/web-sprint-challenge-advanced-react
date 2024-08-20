// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'
import axios from "axios";

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;

const initialState = {
    x: 2,
    y: 2,
    steps: initialSteps,
    message: initialMessage,
    email: initialEmail
}

function plurify(count, word){
    return count === 1 ? word :`${word}s`;
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
constructor() {
    super();
    this.state = initialState;
}


    moveUp = () => {
        if(this.state.y > 1){
            this.setState({
                ...this.state,
                y: this.state.y - 1,
                steps: this.state.steps + 1,
                message: ''
            });
        }else{
            this.setState({
                ...this.state,
                message: "You can't go up",
            });
        }
    }

moveDown = () => {
        if(this.state.y < 3){
            this.setState({
                ...this.state,
                y: this.state.y + 1,
                steps: this.state.steps + 1,
                message: ''
            });
        }else{
            this.setState({
                ...this.state,
                message: "You can't go down",
            });
        }
    }

    moveLeft = () => {
        if(this.state.x > 1){
            this.setState({
                ...this.state,
                x: this.state.x - 1,
                steps: this.state.steps + 1,
                message: ''
            });
        }else{
            this.setState({
                ...this.state,
                message: "You can't go left",
            });
        }
    }

    reset = () => {
        this.setState(initialState);
    }

    moveRight = () => {
        if(this.state.x < 3){
            this.setState({
                ...this.state,
                x: this.state.x + 1,
                steps: this.state.steps + 1,
                message: ''
            });
        }else{
            this.setState({
                ...this.state,
                message: "You can't go right",
            });
        }
    }

    handleEmailChange = (event) => {
        event.preventDefault();
            this.setState({
              email: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        // destructure message prop out of payload, as it is not necessary for the backend
        const {message, ...payload} = this.state;
        axios.post('http://localhost:9000/api/result', payload)
            .then((response) => {
                this.setState({
                   ...this.state,
                     message: response.data.message,
                    email: ''
                });
            }).catch((error) => {
                let newMessage = 'An error occured';
            if (error?.response?.data?.message) {
                newMessage = (error.response.data.message);
            } else if(typeof error?.message === 'string'){
                // Something happened in setting up the request that triggered an Error
                newMessage = (error.message);
            }
            this.setState({
                ...this.state,
                message: newMessage,
            });
        });
    }

isSelected = (row, col)  => {
    const { x, y } = this.state;
    return x === row + 1 && y === col + 1;
}
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {plurify(this.state.steps, "time")}</h3>
        </div>
        <div id="grid">
            {
                new Array(3).fill('col')
                    .map((_, col) =>
                        new Array(3)
                    .fill('row').map((_, row) =>
                    <div key={`${row}-${col}`} className={`square ${this.isSelected(row, col) ? 'active': ''}`}>
                        {this.isSelected(row, col) ? 'B' : null}
                    </div>))
            }
        </div>
          <div className="info">
              <h3 id="message">{this.state.message}</h3>
          </div>
          <div id="keypad">
          <button id="left" onClick={this.moveLeft}>LEFT</button>
          <button id="up" onClick={this.moveUp}>UP</button>
          <button id="right"  onClick={this.moveRight}>RIGHT</button>
          <button id="down" onClick={this.moveDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="type email"></input>
          <input id="submit" type="submit" onClick={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
