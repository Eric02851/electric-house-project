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

function ColorButton(props) {
    let style
    if (!props.on) style = {color: props.color, backgroundColor: 'black'}
    else style = {color: 'black', backgroundColor: props.color}

    const onClick = () => {
        if (!props.on) props.onClick(props.color)
        else props.onUnclick(props.color)
    }

    return <button type='button' style={style} onClick={onClick}>{props.color}</button>
}

class ColorButtonList extends React.Component {
    constructor(props) {
        super(props)
        this.pressed = null
        this.state = {
            red: false,
            orange: false,
            green: false,
            blue: false,
            purple: false,
            cyan: false
        }
    }

    onClick = (color) => {
        let stateJson = JSON.parse(`{"${color}": true}`)
        if (this.pressed) stateJson[this.pressed] = false
        this.pressed = color
        this.setState(stateJson)
    }

    onUnclick = (color) => {
        const stateJson = JSON.parse(`{"${color}": false}`)
        this.pressed = null
        this.setState(stateJson)
    }

    render() {
        return (
            <div>
                <ColorButton on={this.state['red']} color='red' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton on={this.state['orange']} color='orange' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton on={this.state['yellow']} color='yellow' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton on={this.state['green']} color='green' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton on={this.state['blue']} color='blue' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton on={this.state['cyan']} color='cyan' onClick={this.onClick} onUnclick={this.onUnclick} />
                <ColorButton on={this.state['purple']} color='purple' onClick={this.onClick} onUnclick={this.onUnclick} />
            </div>
        )
    }
}
class RgbRelay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { on: false };
    }

    onOff = () => {
        if (!this.state.on) this.setState({ on: true })
        else this.setState({ on: false })
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
                <ColorButtonList />
                <h1>On</h1>
            </div>
        )
    }
}

function App() {
    return (<RgbRelay />)
}

export default App