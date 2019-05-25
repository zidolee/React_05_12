import firebase from 'firebase';
const GET_MOVIE_LIST_REQUEST = 'GET_MOVIE_LIST_REQUEST';
const GET_MOVIE_LIST_SUCCESS = 'GET_MOVIE_LIST_SUCCESS';
const GET_MOVIE_LIST_FAILED = 'GET_MOVIE_LIST_FAILED';

function getMovieListRequest() {
    return{
        type: GET_MOVIE_LIST_REQUEST
    }
}
function getMovieListSuccess(list, last) {
    return{
        type: GET_MOVIE_LIST_SUCCESS,
        payload: {
            list: list,
            last : last,
        }
    }
}

// function getMovieListSuccess(list) {
//     return{
//         type: GET_MOVIE_LIST_SUCCESS,
//         payload: list
//     }
// }

function getMovieListFailed(error) {
    return{
        type: GET_MOVIE_LIST_FAILED,
        payload : error
    }
}

export function getMovieList(last) {
    return (dispatch) => {
        dispatch(getMovieListRequest());
        let query = null;
        if(last) {
            query = firebase.firestore().collection('Movies')
            .orderBy('createdAt')
            .startAfter(last)
            .limit(5)
        } else {
            query = firebase.firestore().collection('Movies')
            .orderBy('createdAt')
            .limit(5)
        }
        query.get()
        .then((snapshot) => {
            //[document,document,document...]
            dispatch(getMovieListSuccess(snapshot.docs, last));
        }).catch((error) => {
            console.log(error)
            dispatch(getMovieListFailed(error));
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

export default function movieListReducer(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_MOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                list: action.payload.last ? [...state.list, ...action.payload.list] : [...action.payload.list]
            })
        case GET_MOVIE_LIST_FAILED:
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