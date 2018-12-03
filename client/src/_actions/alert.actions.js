import {alertConstants} from '../_constants';

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function notify(message) {
    return { type: alertConstants.NOTIFY, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

function startRequest() {
    return { type: alertConstants.START_REQUEST, data: true };
}
function stopRequest() {
    return { type: alertConstants.STOP_REQUEST, data: false };
}
function resetApp() {
    return { type: alertConstants.RESET_APP, data: false };
}

export const alertActions = {
    notify,
    success,
    error,
    clear,
    startRequest,
    stopRequest,
    resetApp,
};
