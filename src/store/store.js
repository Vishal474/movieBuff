import {createStore, applyMiddleware, combineReducers} from 'redux';
// import './main.scss';
import thunk from 'redux-thunk';
//  import your reducers here or create a defaultReducers file
import MoviesReducer from '../reducers/moviesReducer'

let middleware = [thunk]

const store = createStore(
    combineReducers({
        MoviesReducer
    }),
    applyMiddleware(...middleware)
)

export default store;