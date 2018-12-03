import { appConstants} from '../_constants';

function postSignOut() {
    return dispatch => {
        dispatch(success({}));
        function success(user) {
            return {type: appConstants.SIGN_OUT, user}
        }
    }
}
function postSignIn(username) {
    return dispatch => {
        dispatch(success({name: username}));
    };
    function success(user) { return { type: appConstants.SIGN_IN_SUCCESS, user } }
}

export const commonActions = {
    postSignIn,
    postSignOut,
};
