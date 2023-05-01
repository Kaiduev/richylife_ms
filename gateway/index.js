const express = require("express");
const cors = require("cors")
const proxy = require("express-http-proxy")

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/ms1/', proxy('http://localhost:8001'))
app.use('/api/ms2/', proxy('http://localhost:8002'))


app.listen(8000,() => {
    console.log("Gateway service started on port 8000")
})
