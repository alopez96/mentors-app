const userReducer = (state = [], action) => {
    switch(action.type){
        case 'LOAD_USER':{
            console.log('inside reducer')
            console.log('payload', action.payload)
            return action.payload.user
        }
        case 'SIGN_OUT_USER':
        
        default: 
            return state
    }
}

export default userReducer