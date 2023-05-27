const request = require('supertest')
const { app, server } = require('../../src/server')

describe('Photos API', () => {
	describe('GET /api/photos', () => {
		it('should return photos', async () => {
			const response = await request(app).get('/api/photos')
			expect(response.status).toBe(200)
			expect(response.body).toBeDefined()
		})
	})

	describe('GET /api/photos/:category', () => {
		it('should return photos based on category', async () => {
			const response = await request(app).get('/api/photos/sports')
			expect(response.status).toBe(200)
			expect(response.body).toBeDefined()
		})
	})
})

afterAll((done) => {
	server.close(done)
})
