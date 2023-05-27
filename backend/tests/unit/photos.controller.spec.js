const { getPhotos } = require('../controllers/photos.controller')
const pixabayService = require('../services/pixabay.service')

describe('PhotosController', () => {
	let req, res

	beforeEach(() => {
		req = {
			query: {
				category: 'sports',
				pageNumber: 1,
				order: 'popular',
			},
		}
		res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		}
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('getPhotos', () => {
		it('should retrieve and send photos data', async () => {
			const mockPhotosData = [
				{
					total: 34896,
					totalHits: 500,
					hits: [
						{
							id: 8016240,
							pageURL:
								'https://pixabay.com/illustrations/people-tree-understanding-dance-8016240/',
							type: 'illustration',
							tags: 'people, tree, understanding',
							previewURL:
								'https://cdn.pixabay.com/photo/2023/05/25/03/02/people-8016240_150.jpg',
							previewWidth: 150,
							previewHeight: 150,
							webformatURL:
								'https://pixabay.com/get/g1045cf996d670b8e3b554cd7da1bf9b13eaefb287ea9c7294600a65cc0e8724115f37c554c67c3a9549c9ee8e4d1b5d20d8263fdf6e5dab3c3e051bcaf31ff58_640.jpg',
							webformatWidth: 640,
							webformatHeight: 640,
							largeImageURL:
								'https://pixabay.com/get/g73665d3f123edb2fa90c376b1b0d78e342213eebe653b5f76b037fa17c0235ca8034c6056509d081982d63c47f94bbce0683fdd6708a39447ea7569ffa18e111_1280.jpg',
							imageWidth: 6000,
							imageHeight: 6000,
							imageSize: 901546,
							views: 35,
							downloads: 17,
							collections: 1,
							likes: 17,
							comments: 10,
							user_id: 9301,
							user: 'geralt',
							userImageURL:
								'https://cdn.pixabay.com/user/2022/08/25/06-52-36-900_250x250.jpg',
						},
					],
				},
			]
			jest
				.spyOn(pixabayService, 'getPhotos')
				.mockResolvedValueOnce(mockPhotosData)

			await getPhotos(req, res)

			expect(pixabayService.getPhotos).toHaveBeenCalledWith({
				category: 'sports',
				pageNumber: 1,
				order: 'popular',
			})
			expect(res.json).toHaveBeenCalledWith(mockPhotosData)
			expect(res.status).not.toHaveBeenCalled()
			expect(res.send).not.toHaveBeenCalled()
		})

		it('should handle errors and send error response', async () => {
			const mockError = new Error('Something went wrong')
			jest.spyOn(pixabayService, 'getPhotos').mockRejectedValueOnce(mockError)

			await getPhotos(req, res)

			expect(pixabayService.getPhotos).toHaveBeenCalledWith({
				category: 'sports',
				pageNumber: 1,
				order: 'popular',
			})
			expect(res.status).toHaveBeenCalledWith(500)
			expect(res.send).toHaveBeenCalledWith({ err: 'Internal Server Error' })
			expect(res.json).not.toHaveBeenCalled()
		})
	})
})
