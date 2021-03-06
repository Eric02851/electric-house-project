import React from 'react'
import './App.css'
const host = window.location.href //localhost
let buttonStates = {
    1: {
        pressed: null,
        red: false,
        yellow: false,
        green: false,
        blue: false,
        purple: false,
        cyan: false
    },
    2: {
        pressed: null,
        red: false,
        yellow: false,
        green: false,
        blue: false,
        purple: false,
        cyan: false
    }
}

function ColorButton(props) {
    let style
    if (!props.pressed) style = {color: props.color, backgroundColor: 'black'}
    else style = {color: 'black', backgroundColor: props.color}

    const onClick = () => {
        if (!props.pressed) props.onClick(props.color)
        else props.onUnclick(props.color)
    }

    return <button type='button' style={style} onClick={onClick}>{props.color}</button>
}

class ColorButtonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = buttonStates[this.props.LEDNumber]
        this.pressed = this.state.pressed
    }

    componentWillUnmount() {
        buttonStates[this.props.LEDNumber] = this.state
        buttonStates[this.props.LEDNumber].pressed = this.pressed
    }

    postPressed = () => {
        fetch(host, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({LEDNumber: this.props.LEDNumber, pressed: this.pressed})
        })
    }

    onClick = (color) => {
        let stateJson = JSON.parse(`{"${color}": true}`)
        if (this.pressed) stateJson[this.pressed] = false
        this.pressed = color

        this.postPressed()
        this.setState(stateJson)
    }

    onUnclick = (color) => {
        const stateJson = JSON.parse(`{"${color}": false}`)
        this.pressed = null

        this.postPressed()
        this.setState(stateJson)
    }

    render() {
        return (
            <div>
                <ColorButton pressed={this.state['red']} color='red' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton pressed={this.state['yellow']} color='yellow' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton pressed={this.state['green']} color='green' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton pressed={this.state['cyan']} color='cyan' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton pressed={this.state['blue']} color='blue' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton pressed={this.state['magenta']} color='magenta' onClick={this.onClick} onUnclick={this.onUnclick} />

            </div>
        )
    }
}

class Relay2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pressed: false, style: {color: 'red', backgroundColor: 'black'}}
    }

    onClick = () => {
        let requestOptions = {method: 'POST', headers: {'Content-Type': 'application/json'}}
        if (!this.state.pressed) {
            requestOptions.body = JSON.stringify({relayNumber: 2, pressed: true})
            this.setState({pressed: true, style: {color: 'black', backgroundColor: 'red'}})
        }
        else {
            requestOptions.body = JSON.stringify({relayNumber: 2, pressed: false})
            this.setState({pressed: false, style: {color: 'red', backgroundColor: 'black'}})
        }

        fetch(host, requestOptions)
    }

    render() {
        return <button type="button" style={this.state.style} onClick={this.onClick}>Relay 2</button>
    }
}

class Relay1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pressed: false, style: {color: 'red', backgroundColor: 'black'}}
    }

    onClick = () => {
        let requestOptions = {method: 'POST', headers: {'Content-Type': 'application/json'}}
        if (!this.state.pressed) {
            requestOptions.body = JSON.stringify({relayNumber: 1, pressed: true})
            this.setState({pressed: true, style: {color: 'black', backgroundColor: 'red'}})
        }
        else {
            requestOptions.body = JSON.stringify({relayNumber: 1, pressed: false})
            this.setState({pressed: false, style: {color: 'red', backgroundColor: 'black'}})
        }

        fetch(host, requestOptions)
    }

    render() {
        if (!this.state.pressed)
            return (
                <div>
                    <button type="button" style={this.state.style} onClick={this.onClick}>Relay 1</button>
                    <Relay2 />
                </div>
            )

        return (
            <div>
                <button type="button" style={this.state.style} onClick={this.onClick}>Relay 1</button>
                <Relay2 />
                <h1>LED 1:</h1>
                    <ColorButtonList LEDNumber={1} />
                <h1>LED 2:</h1>
                    <ColorButtonList LEDNumber={2} />
            </div>
        )
    }
}

function App() {
    return (<Relay1 />)
}

export default App
