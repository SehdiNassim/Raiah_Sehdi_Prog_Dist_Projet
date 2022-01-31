import { ProtectedApi } from '../Helpers/api';

export const GetCommandes = () => {
    return ProtectedApi.get('/order/user')
}