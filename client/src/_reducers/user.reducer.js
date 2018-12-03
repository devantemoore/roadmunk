import {appConstants} from '../_constants';
import {initialState} from "../_store";

export function user(state=initialState.user, action) {
    switch (action.type) {
        case appConstants.SIGN_IN_SUCCESS:
            return Object.assign({}, state, action.user);
        case appConstants.SIGN_OUT:
            return false;
        default:
            return state
      }
}
