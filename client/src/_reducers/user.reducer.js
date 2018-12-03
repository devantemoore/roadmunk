import {appConstants} from '../_constants';
import {initialState} from "../_store";

export function user(state=initialState.user, action) {
    if(action.type === appConstants.SIGN_OUT)
        console.log(action.user);

    switch (action.type) {
        case appConstants.SIGN_IN_SUCCESS:
            return Object.assign({}, state, action.user);
        case appConstants.SIGN_OUT:
            return Object.assign({}, state, action.user);
        default:
            return state
      }
}
