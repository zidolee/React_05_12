import firebase from 'firebase';
import {DELETE_MYMOVIE_SUCCESS} from './types'
const GET_MYMOVIE_LIST_REQUEST = 'GET_MYMOVIE_LIST_REQUEST';
const GET_MYMOVIE_LIST_SUCCESS = 'GET_MYMOVIE_LIST_SUCCESS';
const GET_MYMOVIE_LIST_FAILED = 'GET_MYMOVIE_LIST_FAILED';

function getMyMovieListRequest() {
    return{
        type: GET_MYMOVIE_LIST_REQUEST
    }
}
function getMyMovieListSuccess(list, last) {
    return{
        type: GET_MYMOVIE_LIST_SUCCESS,
        payload: {
            list: list,
            last : last,
        }
    }
}

// function getMyMovieListSuccess(list) {
//     return{
//         type: GET_MYMOVIE_LIST_SUCCESS,
//         payload: list
//     }
// }

function getMyMovieListFailed(error) {
    return{
        type: GET_MYMOVIE_LIST_FAILED,
        payload : error
    }
}

export function getMyMovieList(last) {
    return (dispatch, getState) => {
        dispatch(getMyMovieListRequest());
        let query = null;
        const userId = getState().auth.user.uid;
        if(last) {
            query = firebase.firestore().collection('Movies')
            .where('userId','==' ,userId)
            .orderBy('createdAt')
            .startAfter(last)//그전 값 그 다음 것
            .limit(3)
        } else {
            query = firebase.firestore().collection('Movies')
            .where('userId','==',userId)
            .orderBy('createdAt')
            .limit(3)
        }
        query.get()
        .then((snapshot) => {
            //[document,document,document...]
            dispatch(getMyMovieListSuccess(snapshot.docs, last));
        }).catch((error) => {
            console.log(error)
            dispatch(getMyMovieListFailed(error));
        })
    }
}

const initialState = {
    list:[],
    isLoading : false ,
    isSuccess: false,
    isFailed : false,
    error : null,
}

export default function myMovieListReducer(state = initialState, action) {
    switch(action.type) {
        case GET_MYMOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_MYMOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                list: action.payload.last ? [...state.list, ...action.payload.list] : [...action.payload.list]
            })
        case GET_MYMOVIE_LIST_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error:  action.payload
            })
        case DELETE_MYMOVIE_SUCCESS :
            return Object.assign({}, state, {
                list : state.list.filter((doc) => doc.id !== action.payload)
            })
        default:
            return state
    }
}