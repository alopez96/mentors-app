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