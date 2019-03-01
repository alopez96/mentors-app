const userReducer = (state = [], action) => {
    switch(action.type){
        case 'LOAD_USER':{
            return action.payload.user
        }
        case 'SIGN_OUT_USER':{ }
        default: 
            return state
    }
}

export default userReducer