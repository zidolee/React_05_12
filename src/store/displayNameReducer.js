import firebase from 'firebase';
import {updateUser} from './authReducer'
const UPDATE_DISPLAY_NAME_REQUEST  = 'UPDATE_DISPLAY_NAME_REQUEST';
const UPDATE_DISPLAY_NAME_SUCCESS  = 'UPDATE_DISPLAY_NAME_SUCCESS';
const UPDATE_DISPLAY_NAME_FAILED  = 'UPDATE_DISPLAY_NAME_FAILED';
const DISPLAY_NAME_VALIDATION_FAILED = 'DISPLAY_NAME_VALIDATION_FAILED';

function updateDisplayNameRequest(){
    return {
        type: UPDATE_DISPLAY_NAME_REQUEST,
    }
}

function updateDisplayNameSuccess(){
    return {
        type: UPDATE_DISPLAY_NAME_SUCCESS,
    }
}

function updateDisplayNameFailed(error){
    return {
        type: UPDATE_DISPLAY_NAME_FAILED,
        payload : error,
    }
}

export function updateDisplayName(displayName) {
    return (dispatch) => {
        dispatch(updateDisplayNameRequest());
        const user = firebase.auth().currentUser;
        if(user) {
            // 로그인 한 상태일 때만 가능
            user.updateProfile({
                displayName : displayName
            }).then( () => {
                dispatch(updateDisplayNameSuccess());
                const updatedUser = firebase.auth().currentUser;
                dispatch(updateUser(updatedUser));
            }).catch( (error) => {
                dispatch(updateDisplayNameFailed(error));
            })
        } else {
            //로그인 하지 않은 상태에서 불가능
            dispatch(updateDisplayNameFailed(new Error('User is not Logined')));
        }
    }
}
export function displayNameValidationFailed(error) {
    return {
        type : DISPLAY_NAME_VALIDATION_FAILED,
        palyload : error
    }
}
const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
}

export default function diplayNameReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DISPLAY_NAME_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case UPDATE_DISPLAY_NAME_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case UPDATE_DISPLAY_NAME_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error:  action.palyload,
            })
        case DISPLAY_NAME_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error : action.palyload
            })
        default:
            return state;
    }
}