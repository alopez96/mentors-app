const usersReducer = (state = [], action) => {
    switch(action.type){
        case 'FIND_USERS':{
            console.log('users reducer')
            console.log('payload', action.payload.users)
            return [
                ...state, action.payload.users
            ]
        }
        default:
            return state
    }
}

export default usersReducer