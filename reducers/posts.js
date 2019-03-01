const postsReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_POSTS':{
            console.log('posts payload', action.payload.users)
            return [
                action.payload.users
            ]
        }
        default:
            return state
    }
}

export default postsReducer