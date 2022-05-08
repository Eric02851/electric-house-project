import React from 'react'
import './App.css'

/*
function Button() {
    const onClick = () =>{
        socket.emit('click')
    }

    return (<button type="button" onClick={onClick}>Click Me!</button>)
}
*/

class Button extends React.Component {
    /*
    Props:
        color: string color
        LED: 0 or 1
        
    */

    constructor(props) {
        super(props);
        this.state = {
            on: false,
            style: {color: this.props.color, backgroundColor: 'black'}
        }
    }

    onClick = () => {
        if (!this.state.on) this.setState({on: true})
        else this.setState({on: false})
    }

    render() {
        if (!this.state.on) 
            return (<button type='button' style = {{color: this.props.color, backgroundColor: 'black'}} onClick={this.onClick}>{this.props.color}</button>)
        else 
            return (<button type='button' style = {{color: 'black', backgroundColor: this.props.color}} onClick={this.onClick}>{this.props.color}</button>)
    }
}

class RgbRelay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { on: false };
    }

    onOff = () => {
        if (!this.state.on) this.setState({on: true})
        else this.setState({on: false})
    }

    render() {
        if (!this.state.on) {
            return (
                <div>
                    <button type="button" onClick={this.onOff}>Click Me!</button>
                    <h1>Off</h1>
                </div>
            )
        }

        return (
            <div>
                <button type="button" onClick={this.onOff}>Click Me!</button>
                <h1>LED 1:</h1>
                    <Button led={0} color="red" />
                    <Button led={0} color="orange" />
                <h1>On</h1>
            </div>
        )
    }
}

function App() {
    return (<RgbRelay />)
}

export default App