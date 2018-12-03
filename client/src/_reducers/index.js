import { combineReducers } from 'redux';

import { requesting } from './requesting.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import {alertConstants} from "../_constants";

const appReducers = combineReducers({
    user,
    alert,
    requesting,
});

const rootReducer = (state, action) => {
    if (action.type === alertConstants.RESET_APP) {
        state = undefined;
    }
    return appReducers(state, action);
};
export default rootReducer;
