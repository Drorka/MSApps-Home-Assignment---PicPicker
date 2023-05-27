import Axios from 'axios'

export const httpService = {
	get,
}
const BASE_URL = '//localhost:3030/api/'

const axios = Axios.create({
	baseURL: BASE_URL,
	withCredentials: false,
})

async function get(endpoint, data) {
	try {
		const res = await axios(endpoint, { params: data })
		return res.data
	} catch (error) {
		console.error(
			`Had Issues getting to the backend, endpoint: ${endpoint}, with data: `,
			data
		)
		throw error
	}
}
