import axios from "axios"
import config from '../Config'
import { RefreshAccessToken } from "../Services/Auth"
import { getAccessToken, getRefreshToken, persistCurrentUser, removeCurrentUser } from "./jwt"
import { addLoader, removeLoader } from './files-loader';

const Api = axios.create(
    {
        baseURL: config.api_url,
        headers: {
            "content-type": "application/json",
            "access-control-allow-headers": "*",
        }
    }
)
Api.interceptors.request.use(
    async (req) => {
        if (req.url === '/auth/token/refresh') {
            const refreshToken = await getRefreshToken()
            req.headers.common['Authorization'] = 'Bearer ' + refreshToken
        }
        return req
    },
    error => Promise.reject(error)
)


export const ProtectedApi = axios.create({
    baseURL: config.api_url,
    headers: { "Content-Type": "application/json", "access-control-allow-headers": "*" }
});
ProtectedApi.interceptors.request.use(
    async req => {
        const accessToken = await getAccessToken()
        req.headers['Authorization'] = 'Bearer ' + accessToken;
        return req;
    },
    error => {
        Promise.reject(error)
    });
ProtectedApi.interceptors.response.use(
    res => res,
    async error => {
        if (error.response) {
            const originalConfig = error.config
            if (error.response.status === 409 && !originalConfig._retry) {
                originalConfig._retry = true
                try {
                    const rs = await RefreshAccessToken()
                    const refreshToken = await getRefreshToken()
                    const accessToken = rs.data.accessToken
                    persistCurrentUser({ refreshToken, accessToken })
                    // ProtectedApi.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                    return ProtectedApi(originalConfig)
                } catch (_error) {
                    removeCurrentUser()
                    window.location.reload()
                    return Promise.reject(_error)
                }
            }
        }
        return Promise.reject(error)
    }
)


export const ProtectedFilesApi = axios.create({
    baseURL: config.api_url,
    headers: { "Content-Type": "multipart/form-data", "access-control-allow-headers": "*" }
});
ProtectedFilesApi.interceptors.request.use(
    async req => {
        addLoader()
        const accessToken = await getAccessToken()
        req.headers.common['Authorization'] = 'Bearer ' + accessToken;
        return req;
    },
    error => {
        Promise.reject(error)
    });
ProtectedFilesApi.interceptors.response.use(
    res => {
        removeLoader()
        return res
    },
    async error => {
        removeLoader()
        if (error.response) {
            const originalConfig = error.config
            if (error.response.status === 409 && !originalConfig._retry) {
                originalConfig._retry = true
                try {
                    const rs = await RefreshAccessToken()
                    const refreshToken = await getRefreshToken()
                    const accessToken = rs.data.accessToken
                    persistCurrentUser({ refreshToken, accessToken })
                    // ProtectedFilesApi.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                    return ProtectedApi(originalConfig)
                } catch (_error) {
                    removeCurrentUser()
                    window.location.reload()
                    return Promise.reject(_error)
                }
            }
        }
        return Promise.reject(error)
    }
)
export default Api