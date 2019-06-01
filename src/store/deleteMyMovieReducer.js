import firebase from 'firebase';
import {getMyMovieList} from './myMovieListReducer'
import {DELETE_MYMOVIE_REQUEST, DELETE_MYMOVIE_SUCCESS, DELETE_MYMOVIE_FAILED} from './types'

function deleteMyMovieRequest() {
    return{
        type: DELETE_MYMOVIE_REQUEST
    }
}
function deleteMyMovieSuccess(id) {
    return{
        type: DELETE_MYMOVIE_SUCCESS,   //액션
        payload : id,                   //데이터
    }
}

// function deleteMyMovieSuccess(list) {
//     return{
//         type: DELETE_MYMOVIE_SUCCESS,
//         payload: list
//     }
// }

function deleteMyMovieFailed(error) {
    return{
        type: DELETE_MYMOVIE_FAILED,
        payload : error
    }
}

export function deleteMyMovie(movieId) {
    return (dispatch, getState) => {
        dispatch(deleteMyMovieRequest());

        const userId = getState().auth.user.uid;

        // movieId 데이터르 ㄹ가져옴
        // userI가 로그인한 userId이지 확인
        // 맞으면 삭제
        // 아니면 권한 오류 발생

        firebase.firestore().collection("Movies").doc(movieId)
            .delete()
            .then(() => {
                dispatch(deleteMyMovieSuccess(movieId));
                // dispatch(getMyMovieList(null))
            }).catch(()=> {
                dispatch(deleteMyMovieFailed());
            })
       
    }
}

const initialState = {
    isLoading : false ,
    isSuccess: false,
    isFailed : false,
    error : null,
}

export default function deleteMyMovieReducer(state = initialState, action) {
    switch(action.type) {
        case DELETE_MYMOVIE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case DELETE_MYMOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case DELETE_MYMOVIE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error:  action.payload
            })
        default:
            return state
    }
}