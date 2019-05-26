import firebase from 'firebase'
import uuid from 'uuid';

const INIT_ADD_MOVIE_STATE = 'INIT_ADD_MOVIE_STATE';

export const initAddMovieState = () => {
    return {
        type:INIT_ADD_MOVIE_STATE
    }
}

const ADD_MOVIE_VALIDATION_FAILED = 'ADD_MOVIE_VALIDATION_FAILED';

export const addMovieValidationFailed = (error) => {
    return  {
        type: ADD_MOVIE_VALIDATION_FAILED,
        payload : error,
    }
}

const ADD_MOVIE_REQUEST = 'ADD_MOVIE_REQUEST';
const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS';
const ADD_MOVIE_FAILED = 'ADD_MOVIE_FAILED';

function addMovieRequest() {
    return {
        type: ADD_MOVIE_REQUEST,
    }
}

function addMovieSuccess() {
    return  {
        type: ADD_MOVIE_SUCCESS,
    }
}

function addMovieFailed (error) {
    return  {
        type: ADD_MOVIE_FAILED,
        payload : error
    }
}

export function addMovie(name, director, openedAt, description, file) {
    return (dispatch, getState) => {
        dispatch(addMovieRequest());
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
              return firebase.firestore().collection('Movies').add({
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
                dispatch(addMovieSuccess());
            }).catch((error) => {
                dispatch(addMovieFailed(error));
            })
        } else {
            firebase.firestore().collection('Movies').add({
                name: name,
                director : director,
                openedAt : openedAt,
                description : description,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).then(() => {
                dispatch(addMovieSuccess());
            }).catch((error) => {
                dispatch(addMovieFailed(error));
            })
        }
        
    }
}



const initialState = {
    error : null,
    isLoading : false,
    isSuccess : false,
    isFailed : true,
}

export default function addMovieReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_MOVIE_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error : action.payload
            })
        case ADD_MOVIE_REQUEST:
                return Object.assign({}, state, {
                    isLoading: true,
                    isSuccess: false,
                    isFailed: false,
                    error: null,
                })
            case ADD_MOVIE_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: true,
                    isFailed: false,
                })
            case ADD_MOVIE_FAILED:
                const error = action.palyload;
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: false,
                    isFailed: true,
                    error: error
                })
            case INIT_ADD_MOVIE_STATE:
                return Object.assign({}, initialState); //새로운 빈객체를 만들어서 initialState를 넣음
        default:
            return state;
    }
}