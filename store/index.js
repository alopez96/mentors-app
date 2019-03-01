import {combineReducers ,createStore} from 'redux'
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';
import postsReducer from '../reducers/posts';

const allReducers = combineReducers({
    users: usersReducer,
    user: userReducer,
    posts: postsReducer
})

export default store = createStore(allReducers)