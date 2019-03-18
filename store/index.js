import {combineReducers ,createStore} from 'redux'
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';
import { postReducer, postsReducer, updatePostTypeReducer } from '../reducers/posts';
import { questionReducer } from '../reducers/questions';
import viewUserReducer from '../reducers/viewUser';

const allReducers = combineReducers({
    users: usersReducer,
    user: userReducer,
    post: postReducer,
    posts: postsReducer,
    questions: questionReducer,
    updatePost: updatePostTypeReducer,
    userid: viewUserReducer,
})

export default store = createStore(allReducers)