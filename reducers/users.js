const usersReducer = (state = [], action) => {
    switch(action.type){
        case 'FIND_USERS':{
            return [
                action.payload.users
            ]
        }
        default:
            return state
    }
}

export default usersReducer