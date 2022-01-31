import { combineReducers } from 'redux';
import user from './User/reducers';
import menu from './Menu/reducers';

export default combineReducers({
    user, menu
})