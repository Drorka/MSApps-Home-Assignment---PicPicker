import axios from 'axios'

export const pixabayService = {
	query,
}

// * for dev purposes
const hardCodedPhotos = [
	{
		id: 729510,
		type: 'photo',
		tags: 'marguerite, daisy, flower',
		previewURL:
			'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/ge7e9b53e93ec42e4242e2e58ca20b37cf421487005dd85cb76c3356d5cb714769bc9fdf735648b3f2ee4198dfe3cac6c8d61d067d40858feb4be0d571f14ec3a_1280.jpg',
		views: 1615030,
		downloads: 701377,
		collections: 2518,
	},
	{
		id: 165819,
		type: 'photo',
		tags: 'rose, flower, dew',
		previewURL:
			'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/g0dfdb18cf71dda791eea20f7ab9ff5887efe9b3ace3e7a722780024a454f56d361faa881bd1ab2c90917c094567736473cb0564323dd81b2392b310263997b37_1280.jpg',
		views: 2117321,
		downloads: 687240,
		collections: 2491,
	},
	{
		id: 729509,
		type: 'photo',
		tags: 'hd wallpaper, rose, flower',
		previewURL:
			'https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/g69fcaf0b5c08f3236835faabf1295672748f77c8171c639011a602bfef3113c8efadcfe1aebb5f256f94afa823b5b0d58b62ccec900995e9da49a082381b5538_1280.jpg',
		views: 2594710,
		downloads: 1371340,
		collections: 2776,
	},
	{
		id: 3140492,
		type: 'photo',
		tags: 'beautiful nature, nature background, flower',
		previewURL:
			'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/ge6bfc2a72b4d84de2623306836a32877ecfc89a9ebe034743bbbeebf087639c7ee9ff65163c835d12ac20254ceea90a0a0f17e870c09bfcad0b3e5827110115e_1280.jpg',
		views: 2722007,
		downloads: 1956705,
		collections: 2519,
	},
	{
		id: 324175,
		type: 'photo',
		tags: 'pink, cherry blossoms, flowers',
		previewURL:
			'https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/gd956aa707c946e238331c8b16f19ee8fa69d0f317b048aa4577107bda10fff9ad13093d192351a8f18fc7e67da5df2d7169a3e78511329a72fe53ed49910ff6d_1280.jpg',
		views: 4295263,
		downloads: 2201263,
		collections: 4484,
	},
	{
		id: 729512,
		type: 'photo',
		tags: 'beautiful nature, hd wallpaper, nature background',
		previewURL:
			'https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/g9a823c0f93d6b13b668aae48e1237643af086a6ddef52defa64df047d4856af1c3beced571dd37a5ee9d8ef0c998645bfa895a9d49f482ef8de6ec64533ca193_1280.jpg',
		views: 1431140,
		downloads: 942800,
		collections: 2217,
	},
	{
		id: 978659,
		type: 'photo',
		tags: 'lotus, flower, bloom',
		previewURL:
			'https://cdn.pixabay.com/photo/2015/10/09/00/55/lotus-978659_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/ge0a7dcd0fad9470ba47e7789cda06bd56fabf0e3be47e036191b49a976b55c08622085c4eaa9aed567355f45e6cf6de96177684408d01242e1693b54d14c1736_1280.jpg',
		views: 750194,
		downloads: 388862,
		collections: 2022,
	},
	{
		id: 100263,
		type: 'photo',
		tags: 'flower, poppy, field',
		previewURL:
			'https://cdn.pixabay.com/photo/2013/04/03/21/25/flower-100263_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/g8cc45dc7504767e659d0fa23362b5b3df4abb18a7a1f3e3c022bf4cfb7a96011700758a55aaf10b5825ddd4683754032197f858d6e32be89d0280158138d86ee_1280.jpg',
		views: 787579,
		downloads: 367809,
		collections: 1645,
	},
	{
		id: 142876,
		type: 'photo',
		tags: 'bouquet, flowers, roses',
		previewURL:
			'https://cdn.pixabay.com/photo/2013/07/02/22/20/bouquet-142876_150.jpg',
		largeImageURL:
			'https://pixabay.com/get/g5f10675d27f78dad5d13af3d966059a541b3d89fdcd0e6962de0ffd337b6f939dd6d312c42c72e1f82165cd3daafa40b801890263116e7eac7b091acf31fc287_1280.jpg',
		views: 1602001,
		downloads: 513727,
		collections: 1964,
	},
	// {
	// 	id: 276014,
	// 	pageURL:
	// 		'https://pixabay.com/photos/flowers-meadow-sunlight-summer-276014/',
	// 	type: 'photo',
	// 	tags: 'flowers, meadow, sunlight',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 95,
	// 	webformatURL:
	// 		'https://pixabay.com/get/gfe076603a1b187af578c335e3889a1ba6b5d00e6c9bf10280d5b358a59427a79d089d6a9d7695f0bd92a5b156de03344_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 407,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gf882a02b772ddec12ad522ded2a7a618750c473d9361c969a44392f17598d418dfdc1b6541eda904121d81a5a94f159b7756469d11f74a6885fa4d280e1a4742_1280.jpg',
	// 	imageWidth: 4090,
	// 	imageHeight: 2602,
	// 	imageSize: 2134495,
	// 	views: 3662941,
	// 	downloads: 1601534,
	// 	collections: 4754,
	// 	likes: 6077,
	// 	comments: 1865,
	// 	user_id: 1107275,
	// 	user: 'Larisa-K',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2015/06/13/06-38-56-116_250x250.jpg',
	// },
	// {
	// 	id: 2336287,
	// 	pageURL:
	// 		'https://pixabay.com/illustrations/flower-spring-floral-artwork-2336287/',
	// 	type: 'illustration',
	// 	tags: 'flower, spring, floral',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2017/05/23/05/33/flower-2336287_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 99,
	// 	webformatURL:
	// 		'https://pixabay.com/get/g708598d277bb2d7e86090a09101f192d4f70ea6cde4dd4818f8322f7df69d226ffc8b7985be74cefe4ce02d6d3b73fcd268ec378b6719259aecb28a89aa992c6_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 426,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/g0fc94e61d9f7aa5458c198a321011fc3a6d593aa4735aca4462cdddacb864f5b4e223c2a26f31194f63d887652b31a9286411fa54c7334a6591f1b7a7d8552f0_1280.jpg',
	// 	imageWidth: 1920,
	// 	imageHeight: 1280,
	// 	imageSize: 252250,
	// 	views: 579709,
	// 	downloads: 251820,
	// 	collections: 2108,
	// 	likes: 1801,
	// 	comments: 567,
	// 	user_id: 3064916,
	// 	user: 'Owantana',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2022/06/25/11-58-11-581_250x250.jpg',
	// },
	// {
	// 	id: 3784022,
	// 	pageURL:
	// 		'https://pixabay.com/photos/hd-wallpaper-water-lily-flower-3784022/',
	// 	type: 'photo',
	// 	tags: 'hd wallpaper, water lily, flower',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 101,
	// 	webformatURL:
	// 		'https://pixabay.com/get/gc18dc72549c415517ea3252a553d49d7a8f96ad895c2346831d13f8b939f8889bb4ea64f4d62bc948f5a48cfc045a6a385880199bf592516498572c5e40008c9_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 435,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/g22761cd2ae575552427763083259dffdfc0394c0ce4b72f36da704d7d24496012a474945d4cd3682b7c239cd68cec29c03d10b13884ff2c0062c976b974f9fd8_1280.jpg',
	// 	imageWidth: 4573,
	// 	imageHeight: 3114,
	// 	imageSize: 2422482,
	// 	views: 1202249,
	// 	downloads: 803144,
	// 	collections: 1534,
	// 	likes: 1859,
	// 	comments: 324,
	// 	user_id: 1195798,
	// 	user: 'Couleur',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2023/05/22/14-31-19-42_250x250.jpg',
	// },
	// {
	// 	id: 19830,
	// 	pageURL: 'https://pixabay.com/photos/flowers-butterfly-19830/',
	// 	type: 'photo',
	// 	tags: 'flowers, butterfly, silver washed fritillary',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 99,
	// 	webformatURL:
	// 		'https://pixabay.com/get/gd5d591c98e61a5c5030aea64c9202eb196b1e9287e6b80463efecf690c457ecce110a8859fd15b50953a4987a5f91776_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 425,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gf7bacb9cc3a1137d13d89ea67f0fbd88872a6e7165a0abf4a06cf32f37f0682464b5e7b774b482acd50d6f09c06de269_1280.jpg',
	// 	imageWidth: 2144,
	// 	imageHeight: 1424,
	// 	imageSize: 668020,
	// 	views: 2481100,
	// 	downloads: 840406,
	// 	collections: 3805,
	// 	likes: 4663,
	// 	comments: 1006,
	// 	user_id: 1107275,
	// 	user: 'Larisa-K',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2015/06/13/06-38-56-116_250x250.jpg',
	// },
	// {
	// 	id: 1205631,
	// 	pageURL: 'https://pixabay.com/photos/lotus-flower-lily-pad-pond-1205631/',
	// 	type: 'photo',
	// 	tags: 'lotus, flower, lily pad',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2016/02/17/19/08/lotus-1205631_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 99,
	// 	webformatURL:
	// 		'https://pixabay.com/get/g301fb618e998fb7499a7ceb25812ce706a5b0bcc3bcfdb77f3e6397260efbd88ae3b9e4d40a76481ad2dd7fb68076fc284955a8d4cc4fb7e72e9a3b23b637ed2_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 426,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/g97b660054ef3aad04bb48e76853cfe405d8eb350d1ea7b4f511abf1fed89ea64fb38c3620cb04754241b79d8269c1e88c4c8809d4a2ff3c0d3413e56b4ba3e9c_1280.jpg',
	// 	imageWidth: 5184,
	// 	imageHeight: 3456,
	// 	imageSize: 4776299,
	// 	views: 1107589,
	// 	downloads: 625150,
	// 	collections: 2396,
	// 	likes: 2678,
	// 	comments: 498,
	// 	user_id: 1785462,
	// 	user: 'ha11ok',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2022/04/21/13-05-33-554_250x250.png',
	// },
	// {
	// 	id: 250016,
	// 	pageURL:
	// 		'https://pixabay.com/photos/flower-field-flowers-field-trees-250016/',
	// 	type: 'photo',
	// 	tags: 'flower field, flowers, field',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2014/01/22/19/44/flower-field-250016_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 108,
	// 	webformatURL:
	// 		'https://pixabay.com/get/g83aa43cf54f7fa2dea374f72f2910e0e39b50ed801e65da051ed5e4ae65b3be802872b9b22c37d272dfc9d1a58afb4f8_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 463,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gf7e85d145d952e4bd2d325d47cf811a4e303445ece217149fd7ec08ba07b5e14b237cc387b16b91e138c813f0bb234a5e18dcc739a2fb8f718bc8874db740ec6_1280.jpg',
	// 	imageWidth: 4984,
	// 	imageHeight: 3607,
	// 	imageSize: 6895586,
	// 	views: 1080847,
	// 	downloads: 519893,
	// 	collections: 1453,
	// 	likes: 2135,
	// 	comments: 571,
	// 	user_id: 37465,
	// 	user: 'DeltaWorks',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2022/11/20/04-31-06-537_250x250.png',
	// },
	// {
	// 	id: 3063284,
	// 	pageURL:
	// 		'https://pixabay.com/photos/rose-flower-petal-floral-noble-3063284/',
	// 	type: 'photo',
	// 	tags: 'rose, flower, petal',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2018/01/05/16/24/rose-3063284_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 99,
	// 	webformatURL:
	// 		'https://pixabay.com/get/gafd3f3336d14057429783dc47461a856f6b7b8d7c942369f1ca3563509f9535f3af62b86c8e1538fd10e098546052ef12548cf122b457906f641b51768cd5aaf_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 426,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gf205b0cbebb89c12c41121eee629edb72c5884933a4235d92657d7ca6589a1cab55850f49dceb9be4a4628970d7029cf6120aea6b2866a5636827506119b7c2a_1280.jpg',
	// 	imageWidth: 6000,
	// 	imageHeight: 4000,
	// 	imageSize: 3574625,
	// 	views: 1089105,
	// 	downloads: 705256,
	// 	collections: 1447,
	// 	likes: 1565,
	// 	comments: 334,
	// 	user_id: 1564471,
	// 	user: 'anncapictures',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2015/11/27/06-58-54-609_250x250.jpg',
	// },
	// {
	// 	id: 320868,
	// 	pageURL: 'https://pixabay.com/photos/rose-flower-petals-red-rose-320868/',
	// 	type: 'photo',
	// 	tags: 'rose, flower, petals',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2014/04/10/11/24/rose-320868_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 116,
	// 	webformatURL:
	// 		'https://pixabay.com/get/gebe07a2dad2c198a1e2797a2f28dd2e2da468e63e0f35c7513031e50bd0551aadb70beed3b9ac97beff9a5afea367736_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 495,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gb6051fee32ed7fa0762322db93d2c1ad14d7857230ed1a09a92f61cc02d5131faabf99ae685be155f4e6e030e099326337d66fa7fbae9489375ec515d6dc2147_1280.jpg',
	// 	imageWidth: 5168,
	// 	imageHeight: 4000,
	// 	imageSize: 1677648,
	// 	views: 1425835,
	// 	downloads: 404980,
	// 	collections: 1526,
	// 	likes: 1677,
	// 	comments: 344,
	// 	user_id: 48777,
	// 	user: 'Josch13',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg',
	// },
	// {
	// 	id: 2342706,
	// 	pageURL:
	// 		'https://pixabay.com/illustrations/flower-abstract-painting-floral-2342706/',
	// 	type: 'illustration',
	// 	tags: 'flower, abstract, painting',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2017/05/25/09/22/flower-2342706_150.jpg',
	// 	previewWidth: 150,
	// 	previewHeight: 105,
	// 	webformatURL:
	// 		'https://pixabay.com/get/g1278f6fa707e2d1dc37a66a2baa31ff306498f87cdaa5a39b113774da9feaa2be028019c7a71bfa60ec991b666c21ab45a5b6e6067e25dc41f2c602a07de7338_640.jpg',
	// 	webformatWidth: 640,
	// 	webformatHeight: 452,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gc08410037d1732c35363235a4baf4d71bdfe05f36d3fd3ff2d4c3dcbf00819c22f0b44fd4b776af7d7a6ea323d59a7202fd73e24ee9eb025cf1248ca1cd8f627_1280.jpg',
	// 	imageWidth: 3508,
	// 	imageHeight: 2480,
	// 	imageSize: 771512,
	// 	views: 364832,
	// 	downloads: 164229,
	// 	collections: 1502,
	// 	likes: 1369,
	// 	comments: 343,
	// 	user_id: 3064916,
	// 	user: 'Owantana',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2022/06/25/11-58-11-581_250x250.jpg',
	// },
	// {
	// 	id: 2540641,
	// 	pageURL:
	// 		'https://pixabay.com/illustrations/art-bloom-flower-hand-painted-2540641/',
	// 	type: 'illustration',
	// 	tags: 'art, bloom, flower',
	// 	previewURL:
	// 		'https://cdn.pixabay.com/photo/2017/07/26/06/34/art-2540641_150.png',
	// 	previewWidth: 150,
	// 	previewHeight: 135,
	// 	webformatURL:
	// 		'https://pixabay.com/get/gb129ec26520f80fe6ba536a45d3b1c4d500ca30b7c65d2092e88dc3ba0330e0f9dee275746912f36ef0bb65fd7bd1103cfd3a69c5264fffdf6c1c5671a54b67a_640.png',
	// 	webformatWidth: 640,
	// 	webformatHeight: 578,
	// 	largeImageURL:
	// 		'https://pixabay.com/get/gc4f997505703594e8680670ffb3f19aec2c3c7218114db84e655e1227cbeedee032a2bd6ca25acabcbff730d869b55f8a7efd720649e3ef5d2cd2b6f3bd37cae_1280.png',
	// 	imageWidth: 2200,
	// 	imageHeight: 1988,
	// 	imageSize: 3383580,
	// 	views: 516801,
	// 	downloads: 334327,
	// 	collections: 1471,
	// 	likes: 1168,
	// 	comments: 259,
	// 	user_id: 5196888,
	// 	user: 'jinjinjinjin',
	// 	userImageURL:
	// 		'https://cdn.pixabay.com/user/2017/04/25/08-19-25-51_250x250.jpg',
	// },
]

const STORAGE_KEY = 'photos'
const photos = _loadFromStorage(STORAGE_KEY) || null
const API_KEY = 'JRY734h_KdVD-02lIwlrBk6TQnUCv29JyIqGjCYYVrE'

async function query(searchTxt) {
	// * for dev purposes
	return hardCodedPhotos

	// * real function
	if (!searchTxt && photos) return photos
	let URL = `https://api.unsplash.com/photos/random?count=30${
		searchTxt ? `&query=${searchTxt}` : ''
	}&client_id=${API_KEY}`

	try {
		const response = await axios.get(URL)
		const { data } = response
		const photos = data.map((photo) => ({
			backgroundColor: photo.color,
			background: photo.urls.full,
			thumbnail: photo.urls.small,
		}))
		_saveToStorage(STORAGE_KEY, photos)
		console.log(photos)
		return photos
	} catch (err) {
		console.error('ERROR in getting photos!', err)
	}
}

function _saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}
