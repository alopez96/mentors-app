import {combineReducers ,createStore} from 'redux'
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';
import { postsReducer, questionReducer, updatePostTypeReducer } from '../reducers/posts';
import viewUserReducer from '../reducers/viewUser';

const allReducers = combineReducers({
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
    questions: questionReducer,
    updatePost: updatePostTypeReducer,
    userid: viewUserReducer,
})

export default store = createStore(allReducers)