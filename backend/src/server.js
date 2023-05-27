const express = require('express')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app)
const photoRoutes = require('./routes/photo.routes')

app.use(express.json())

const corsOptions = {
	origin: ['http://localhost:8080', 'http://localhost:3000'],
}
app.use(cors(corsOptions))

app.use('/api/photos', photoRoutes)

const port = process.env.PORT || 3030
http.listen(port, () => {
	console.log('Server is running on port: ' + port)
})
