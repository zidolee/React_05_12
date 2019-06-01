import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import logoutReducer from './logoutReducer';
import displayNameReducer from './displayNameReducer'
import addMovieReducer from './addMovieReducer'
import movieListReducer from './movieListReducer'
import myMovieListReducer from './myMovieListReducer';
import updateMovieReducer from './updateMovieReducer';
import deleteMyMovieReducer from './deleteMyMovieReducer';

export function configureStore() {

    const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
     compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__()
     ) : 
    applyMiddleware(thunk)
    return createStore(
        combineReducers({
            auth: authReducer,
            signup: signupReducer,
            login : loginReducer,
            logout: logoutReducer,
            displayName : displayNameReducer,
            addMovie: addMovieReducer,
            movieList: movieListReducer,
            myMovieList: myMovieListReducer,
            updateMovie: updateMovieReducer,
            deleteMyMovie: deleteMyMovieReducer,
        }),
         middleware
    )
}
