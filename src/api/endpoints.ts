const baseURL = "https://outreach-api-weld.vercel.app"

const endpoints = {
	login: `${baseURL}/admin/signin`,
	getUsers: `${baseURL}/user/get`,
	getPosts: `${baseURL}/feed/get`,
	blockUser: `${baseURL}/user/block`,
	blockPost: `${baseURL}/feed/block`,
}

export default endpoints