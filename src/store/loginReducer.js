import firebase from 'firebase'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
const LOGIN_VALIDATION_FAILED = 'LOGIN_VALIDATION_FAILED'

function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        palyload: error
    }
}

export function login(email, password) {
    return (dispatch) => {

        dispatch(loginRequest());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(loginSuccess());
            })
            .catch((error) => {
                dispatch(loginFailed(error));
            });
    }
}

export function loginValidationFailed(error) {
    return {
        type: LOGIN_VALIDATION_FAILED,
        payload: error
    }
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error:  action.palyload
            })
        case LOGIN_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload
            })
        default:
            return state;
    }
}
