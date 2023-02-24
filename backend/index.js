const express = require('express')
const dotenv = require('dotenv').config()
require('./dbconfig/dbConfig')

const port = process.env.PORT

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})