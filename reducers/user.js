const user = (state = [], action) => {
    switch(action.type){
        case 'LOAD_USER':{
            console.log('log in clicked, reducer')
            console.log(state,action)
            console.log('payload', action.payload)
            return [
                ...state, action.payload
            ]

        }
        case 'SIGN_OUT_USER':
        
        default:
            return state
    }
    return state
}

export default user