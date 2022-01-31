import Api from '../Helpers/api';
import { ProtectedApi } from '../Helpers/api';

export const Login= (payload)=>{
    return Api.post('/auth/login',{...payload})
}
export const register = (payload) => {
    return Api.post('/auth/register', { ...payload })
}
export const load = async () => {
    return ProtectedApi.get('/auth/token/verify')
}
export const RefreshAccessToken =()=>{
    return Api.get('/auth/token/refresh')
}
export const getNavbarData= ()=>{
    return ProtectedApi.get('/user?q=navbar')
}
export const googleAuth = (token) => {
    return Api.get(`/auth/google/token/verify?t=${token}`)
}