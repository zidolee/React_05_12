import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import signupReducer from './signupReducer'

export function configureStore() {
    return createStore(
        combineReducers({
            auth: authReducer,
            signup: signupReducer
        }),
        applyMiddleware(thunk)
    )
}
