const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)
const photoRoutes = require('./api/photo/photo.routes')

app.use(express.json())

const corsOptions = {
	origin: [
		'http://127.0.0.1:8080',
		'http://localhost:8080',
		'http://127.0.0.1:3000',
		'http://localhost:3000',
	],
	credentials: true,
}
app.use(cors(corsOptions))

app.use('/api/photo', photoRoutes)

const port = process.env.PORT || 3030
http.listen(port, () => {
	console.log('Server is running on port: ' + port)
})
