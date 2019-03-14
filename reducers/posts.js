export const postsReducer = (state = [], action) => {
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

export const questionReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_QUESTIONS':{
            return [
                action.payload.questions
            ]
        }
        default:
            return state
    }
}

export const updatePostTypeReducer = (state = [], action) => {
    switch(action.type){
        case 'POST_TYPE':{
            return action.payload.postType
        }
        default:
            return state
    }
}
