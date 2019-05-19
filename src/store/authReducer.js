
import firebase from 'firebase'

const UPDATE_USER = 'UPDATE_USER'

export const updateUser = (firebaseUser) => {
    const user = firebaseUser ? new User(firebaseUser) : null;
    // const user = makeUser(firebaseUser);
    return  {
        type : UPDATE_USER,
        payload : user,
    }
}
class User {
    constructor(firebaseUser){
        this.displayName = firebaseUser.displayName;
        this.email = firebaseUser.email;
        this.emailVerified = firebaseUser.emailVerified;
        this.photoURL = firebaseUser.photoURL;
        this.isAnonymous = firebaseUser.isAnonymous;
        this.uid = firebaseUser.uid;
        this.providerData = firebaseUser.providerData;

    }
}
// 위에 거와 같음(위에걸 권장)
// const makeUser = (firebaseUser) => {
//     return {
//         displayName : firebaseUser.displayName,
//         email : firebaseUser.email,
//         emailVerified : firebaseUser.emailVerified,
//         photoURL : firebaseUser.photoURL,
//         isAnonymous : firebaseUser.isAnonymous,
//         uid : firebaseUser.uid,
//         providerData : firebaseUser.providerData
//     }
// }

export const auth = () => {
    //onAuthStateChanged는 한번만 로그인 상태가 변할때마다 호출
    // 로그인, 로그아웃, 회원가입 시에 호출
    // 각 상태가 변할 때마다 state에 유저 정보를 수정하기 위
    //dispatch해야하는데 이를 위해 thunk사용
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
              dispatch(updateUser(firebaseUser));
            } else {
              dispatch(updateUser(null));
            }
          });
    }
}
  
const initialState = {
    user: null,
}
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER :
            return Object.assign({}, state, {
                user : action.payload
            })
        default:
            return state;
    }
}