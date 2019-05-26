import firebase from 'firebase'
import uuid from 'uuid';

const INIT_UPDATE_MOVIE_STATE = 'INIT_UPDATE_MOVIE_STATE';

export const initUpdateMovieState = () => {
    return {
        type:INIT_UPDATE_MOVIE_STATE
    }
}

const UPDATE_MOVIE_VALIDATION_FAILED = 'UPDATE_MOVIE_VALIDATION_FAILED';

export const updateMovieValidationFailed = (error) => {
    return  {
        type: UPDATE_MOVIE_VALIDATION_FAILED,
        payload : error,
    }
}

const UPDATE_MOVIE_REQUEST = 'UPDATE_MOVIE_REQUEST';
const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
const UPDATE_MOVIE_FAILED = 'UPDATE_MOVIE_FAILED';

function updateMovieRequest() {
    return {
        type: UPDATE_MOVIE_REQUEST,
    }
}

function updateMovieSuccess() {
    return  {
        type: UPDATE_MOVIE_SUCCESS,
    }
}

function updateMovieFailed (error) {
    return  {
        type: UPDATE_MOVIE_FAILED,
        payload : error
    }
}

export function updateMovie(name, director, openedAt, description, file) {
    return (dispatch, getState) => {
        dispatch(updateMovieRequest());
        //이미지 => 스토어에 저장
        //데이터 => DB에 저장
        
        //게시글의 소유주를 등록하기 위해
        //사용자 ID가져오는 방법
        //첫 번째 방법 firebase.auth().currentUser
        // const userId = firebase.auth().currentUser.uid;
        
        //두 번째 방법 redux-state에서 userId를 가져오는 방법
        const userId = getState().auth.user.uid;
        if(file) {
            // 이미지 저장 하고 이미지 다운로드 url을 가지고 와서
            // 데이터 베이스에 같이 저장
            
            const filename = uuid.v1();
            const extension = file.name.split('.').pop();
            const url = `movies/${filename}.${extension}`;
            const movieRef = firebase.storage().ref().child(url);
            movieRef.put(file)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();   //서버로부터 다운로드(주소)
            })
            .then((downloadURL) => {
              return firebase.firestore().collection('Movies').update({
                    name: name,
                    imageURL : downloadURL,
                    userId : userId,
                    director : director,
                    openedAt : openedAt,
                    description : description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            })
            .then(() => {
                dispatch(updateMovieSuccess());
            }).catch((error) => {
                dispatch(updateMovieFailed(error));
            })
        } else {
            firebase.firestore().collection('Movies').update({
                name: name,
                director : director,
                openedAt : openedAt,
                description : description,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).then(() => {
                dispatch(updateMovieSuccess());
            }).catch((error) => {
                dispatch(updateMovieFailed(error));
            })
        }
        
    }
}

const GET_UPDATE_MOVIE_REQUEST = 'GET_UPDATE_MOVIE_REQUEST';
const GET_UPDATE_MOVIE_SUCCESS = 'GET_UPDATE_MOVIE_SUCCESS';
const GET_UPDATE_MOVIE_FAILED = 'GET_UPDATE_MOVIE_FAILED';

function getUpdateMovieRequest() {
    return {
        type: GET_UPDATE_MOVIE_REQUEST,
    }
}

function getUpdateMovieSuccess(doc) {
    return  {
        type: GET_UPDATE_MOVIE_SUCCESS,
        payload: doc
    }
}

function getUpdateMovieFailed (error) {
    return  {
        type: GET_UPDATE_MOVIE_FAILED,
        payload : error
    }
}

export function getUpdateMovie(id) {
    return (dispatch, getState) => {
        dispatch(getUpdateMovieRequest());

        firebase.firestore().collection('Movies').doc(id)
            .get()
            .then((doc) => {
                if(doc.exists) {
                    dispatch(getUpdateMovieSuccess(doc));
                } else {
                    dispatch(getUpdateMovieFailed(new Error('Movie is not Found')));
                }
            })
            .catch((error) => {
                dispatch(getUpdateMovieFailed(error));
            })
    }
}

const initialState = {
    error : null,
    isLoading : false,
    isSuccess : false,
    isFailed : true,
    doc : null,
}

export default function updateMovieReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_MOVIE_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error : action.payload
            })
        case UPDATE_MOVIE_REQUEST:
                return Object.assign({}, state, {
                    isLoading: true,
                    isSuccess: false,
                    isFailed: false,
                    error: null,
                })
        case UPDATE_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
            
        case UPDATE_MOVIE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.palyload
            })
        case INIT_UPDATE_MOVIE_STATE:
            return Object.assign({}, initialState); //새로운 빈객체를 만들어서 initialState를 넣음

        case GET_UPDATE_MOVIE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case GET_UPDATE_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                doc: action.payload
            })
        case GET_UPDATE_MOVIE_FAILED:
            const error = action.palyload;
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: error
            })
        default:
            return state;
    }
}