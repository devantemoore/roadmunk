import { alertConstants } from '../_constants';
import {initialState} from "../_store";

export function alert(state=initialState.alert, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return Object.assign({}, state, {
                type: action.type,
                message: action.message
            });
        case alertConstants.ERROR:
            return Object.assign({}, state, {
                type: action.type,
                message: action.message
            });
        case alertConstants.CLEAR:
            return Object.assign({}, state, {
                type: action.type,
                message: action.message
            });
        case alertConstants.NOTIFY:
            return Object.assign({}, state, {
                type: action.type,
                message: action.message
            });
        default:
            return state
      }
}
