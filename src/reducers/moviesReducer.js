const defaultState = {
    movies : [],
    pageNum : 1,
    genres : [],
    configurations: [],
    selectedGenre:-1,
    search:''
}

export default function movies(state = defaultState, action){
    switch(action.type){
        case "GET_MOVIES" : {
            return {...state, ...action.payload}
        }

        default:
            return state
    }
}