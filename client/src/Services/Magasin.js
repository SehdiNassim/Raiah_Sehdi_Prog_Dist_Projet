import { ProtectedApi, ProtectedFilesApi } from '../Helpers/api';

export const addShop = (payload) => {
    return ProtectedFilesApi.post('/shop', payload)
}
export const deleteShop = ({ id }) => {
    return ProtectedFilesApi.delete('/shop', { params: { id } })
}
export const editShop = (id, payload) => {
    return ProtectedFilesApi.put('/shop', payload, { params: { id } })
}
export const getTypes = () => {
    return ProtectedApi.get('/pages/shopTypes')
}
export const getShops = () => {
    return ProtectedApi.get('/shop/user')
}
export const getShop = (id) => {
    return ProtectedApi.get('/shop', { params: { id } })
}