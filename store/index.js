import {combineReducers ,createStore} from 'redux'
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';

const allReducers = combineReducers({
    users: usersReducer,
    user: userReducer
})

export default store = createStore(allReducers)