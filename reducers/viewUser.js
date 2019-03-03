const viewUserReducer = (state = [], action) => {
    switch(action.type){
        case 'VIEW_USER':{
            return action.payload.userid
        }
        case 'SIGN_OUT_USER':{ }
        default: 
            return state
    }
}

export default viewUserReducer