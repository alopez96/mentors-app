const postsReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_POSTS':{
            return [
                action.payload.posts
            ]
        }
        default:
            return state
    }
}

export default postsReducer