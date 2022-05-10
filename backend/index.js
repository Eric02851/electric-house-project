const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const gpio = require('onoff').Gpio

const port = 80
const path = __dirname.split('backend')[0] + 'frontend/build'
const app = express()

app.use(bodyParser.json())
app.use(express.static(path))
app.use(cors())

const components = {
    relay: {
        1: new gpio(2, 'out'),
        2: new gpio(3, 'out')
    },
    LED: {
        1: {
            red: new gpio(17, 'out'),
            green: new gpio(27, 'out'),
            blue: new gpio(22, 'out')
        },
        2: {
            red: new gpio(23, 'out'),
            green: new gpio(24, 'out'),
            blue: new gpio(25, 'out')
        }
    }
}

let LEDColor = {
    1: null,
    2: null
}

const LEDOff = (compNumber) => {
    components.LED[compNumber].red.writeSync(0)
    components.LED[compNumber].green.writeSync(0)
    components.LED[compNumber].blue.writeSync(0)
}

const writePinState = async (compNumber, pressed) => {
    if (typeof pressed == 'boolean') {
        if (pressed) return components.relay[compNumber].writeSync(1)
        return components.relay[compNumber].writeSync(0)
    }

    LEDColor[compNumber] = pressed
    if (!pressed)
        return LEDOff(compNumber)

    LEDOff(compNumber)
    switch (pressed) {
        case 'red':
            components.LED[compNumber].red.writeSync(1)
            return
        case 'green':
            components.LED[compNumber].green.writeSync(1)
            return
        case 'blue':
            components.LED[compNumber].blue.writeSync(1)
            return

        case 'yellow':
            components.LED[compNumber].red.writeSync(1)
            components.LED[compNumber].green.writeSync(1)
            return
        case 'magenta':
            components.LED[compNumber].red.writeSync(1)
            components.LED[compNumber].blue.writeSync(1)
            return
        case 'cyan':
            components.LED[compNumber].green.writeSync(1)
            components.LED[compNumber].blue.writeSync(1)
    }

}

app.get('/', (req, res) => {
    res.sendFile(path + '/index.html')
})

app.post('/', (req, res) => {
    const body = req.body
    if (body.relayNumber) writePinState(body.relayNumber, body.pressed)
    else writePinState(body.LEDNumber, body.pressed)

    console.log(body)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
