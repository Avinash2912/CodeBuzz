const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database.config')
const { PORT } = require('./config/server.config')
const routing = require('./routes/index')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger/swagger.json')
const app = express()

app.use(cors({ credentials: true, origin: true }))

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api', routing)

app.use('*', (req, res, next) => {
    const error = new Error('Route not found')
    error.statusCode = 404
    next(error)
})

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
    console.log('error handler ran ' + error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({
        success: false,
        message: message,
    })
})

process.on('unhandledRejection', (err) => {
    console.log(err)
    console.log('UNHANDLED REJECTION! Shutting down...')
    process.exit(1)
})

process.on('uncaughtException', (err) => {
    console.log(err)
    console.log('UNCAUGHT EXCEPTION! Shutting down...')
    process.exit(1)
})

const startServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
        await connectDB()
    })
}
startServer()
