import {alertConstants} from '../_constants';
import {initialState} from "../_store";

export function requesting(state=initialState.requesting, action) {
    switch (action.type) {
        case alertConstants.START_REQUEST:
            return action.data;
        case alertConstants.STOP_REQUEST:
            return action.data;
        default:
          return state
      }
}
