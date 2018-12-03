import { appConstants } from '../_constants';
import { appHelpers } from '../_helpers';

export const commonService = {
    searchPosts,
    getPostById,
    createPost,
    createComment,

};
function createPost(payload) {
    return appHelpers.postRequest(`${appConstants.API_BASE_URL }/api/User/Search`, payload)
        .then(res => {
            return res;
        }).catch(
            error => {
                let errorMessage = appHelpers.interpretErrorResponse(error);
                return appHelpers.formatPromiseResponse(errorMessage, appConstants.ERROR_RESPONSE);
            }
        );
}
function createComment(payload) {
    return appHelpers.postRequest(`${appConstants.API_BASE_URL }/api/User/Search`, payload)
        .then(res => {
            return res;
        }).catch(
            error => {
                let errorMessage = appHelpers.interpretErrorResponse(error);
                return appHelpers.formatPromiseResponse(errorMessage, appConstants.ERROR_RESPONSE);
            }
        );
}
function searchPosts(payload) {
    return appHelpers.postRequest(`${appConstants.API_BASE_URL }/posts`, payload)
        .then(res => {
            return res;
        }).catch(
            error => {
                let errorMessage = appHelpers.interpretErrorResponse(error);
                return appHelpers.formatPromiseResponse(errorMessage, appConstants.ERROR_RESPONSE);
            }
        );
}
function getPostById(payload) {
    return appHelpers.postRequest(`${appConstants.API_BASE_URL }/api/User/Search`, payload)
        .then(res => {
            return res;
        }).catch(
            error => {
                let errorMessage = appHelpers.interpretErrorResponse(error);
                return appHelpers.formatPromiseResponse(errorMessage, appConstants.ERROR_RESPONSE);
            }
        );
}
