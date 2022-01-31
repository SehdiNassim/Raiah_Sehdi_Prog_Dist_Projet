import { ProtectedApi } from '../Helpers/api';

export const GetCart = () => {
    return ProtectedApi.get('/cart/user')
}
export const AddToCart = (payload) => {
    return ProtectedApi.post('/cart', payload)
}
export const DeleteFromCart = (idProduct) => {
    return ProtectedApi.delete('/cart/product', { params: { idProduct } })
}
export const CommandCart = () => {
    return ProtectedApi.post('/order')
}