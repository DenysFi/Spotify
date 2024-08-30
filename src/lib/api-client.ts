import { env } from "@/config/env"
import Axios from "axios"

// import createAuthRefreshInterceptor from "axios-auth-refresh"
// import { refreshAuth } from "./refresh-token"

// client.post("/token").then(data => {
// 	console.log(data)
// })

export const api = Axios.create({
	baseURL: env.API_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

// api.get("/artists").then(data => {})

// export const setHeaderToken = (token: string) => {
// 	api.defaults.headers.common.Authorization = `Bearer ${token}`
// }

// export const removeHeaderToken = () => {
// 	//client.defaults.headers.common.Authorization = null;
// 	delete api.defaults.headers.common.Authorization
// }

// createAuthRefreshInterceptor(api, refreshAuth, {
// 	statusCodes: [401], // default: [ 401 ]
// 	pauseInstanceWhileRefreshing: true,
// })
