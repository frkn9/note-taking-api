require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const auth = require('./middleware/auth')
const notesRouter = require('./routes/notes-router')
const authRouter = require('./routes/auth-router')

app.use(express.json())

app.use('/api/v1/notes', auth, notesRouter)
app.use('/api/v1/auth', authRouter)

app.use(errorHandler)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()