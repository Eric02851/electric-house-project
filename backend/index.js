
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 80
const path = __dirname.split('backend')[0] + 'frontend/build'
const app = express()

app.use(bodyParser.json())
app.use(express.static(path))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path + '/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.relayNumber)
        console.log(`${req.body.relayNumber}: ${req.body.pressed}`)
    else
        console.log(`${req.body.LEDNumber}: ${req.body.pressed}`)

    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
