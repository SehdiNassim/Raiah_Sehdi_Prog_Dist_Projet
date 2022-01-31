import { ProtectedApi, ProtectedFilesApi } from '../Helpers/api';

export const addProduct = (payload) => {
    return ProtectedFilesApi.post('/product', payload)
}
export const getProduct = (id) => {
    return ProtectedApi.get('/product', { params: { id } })
}
export const deleteProduct = (id) => {
    return ProtectedApi.delete('/product', { params: { id } })
}
export const getProducts = ({ p, shopTypes, maxPrice, minPrice }) => {
    return ProtectedApi.get('/product/dashboard', { params: { p, shopTypes, maxPrice, minPrice } })
}
export const getProductsOfShop = (idShop) => {
    return ProtectedApi.get('/product/shop', { params: { idShop } })
}
export const editProduct = (id, payload) => {
    return ProtectedFilesApi.put('/product', payload, { params: { id } })
}