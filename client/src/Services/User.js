import { ProtectedApi, ProtectedFilesApi } from '../Helpers/api';

export const getUser = () => {
    return ProtectedApi.get('/user')
}

export const editUser = (payload) => {
    return ProtectedApi.patch('/user', payload)
}
export const editFilesUser = (payload) => {
    return ProtectedFilesApi.patch('/user', payload)
}