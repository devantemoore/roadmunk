import moment from "moment/moment";
import { appConstants } from "../_constants";
import axios from "axios";
import { store } from '../_store'
export const appHelpers = {
    formatDate: (d, format) => {
        return moment(d).format(format || "MMM DD, YYYY");
    },
    getRequest: function (url, header) {
        const { user } = store.getState();
        let combinedHeader = { "Content-Type": "application/json" };
        if (user) {
            combinedHeader.Authorization = `${user.name}`;
        }
        let reqHeader = header
            ? header
            : combinedHeader;
        let config = { headers: reqHeader };
        // console.log(config);
        return axios
            .get(url, config)
            .then(function (res) {
                return appHelpers.promiseResponse(res.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    return appHelpers.promiseResponse(error.response.data, appConstants.ERROR_RESPONSE);
                    // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.request};
                    return appHelpers.promiseResponse(error.request, appConstants.ERROR_RESPONSE);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.message};
                    return appHelpers.promiseResponse(error.message, appConstants.ERROR_RESPONSE);
                }
            });
    },
    postRequest: function (url, payload, header) {
        const { user } = store.getState();
        let combinedHeader = { "Content-Type": "application/json"};
        if (user) {
            combinedHeader.Authorization = `${user.name}`;
        }
        let reqHeader = header
            ? header
            : combinedHeader;
        let config = { headers: reqHeader };

        return axios.post(url, payload, config)
            .then(res => {
                return appHelpers.promiseResponse(res.data);
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    let msg = error.response.data;
                    if(error.response.status === 500){
                        msg = "Oops, something went wrong";
                    }else if(error.response.status === 404){
                        msg = "Resource not found";
                    }
                    return appHelpers.promiseResponse(msg, appConstants.ERROR_RESPONSE);
                    // return {statTs: appConstants.REQUEST_FAILURE, data: error.response.data};

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.request};
                    return appHelpers.promiseResponse(error.request, appConstants.ERROR_RESPONSE);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                    // return {status: appConstants.REQUEST_FAILURE, data: error.message};
                    return appHelpers.promiseResponse(error.message, appConstants.ERROR_RESPONSE);
                }
            });
    },
    formatPromiseResponse: function (res, resType) {
        let responseType = (resType === undefined) ? appConstants.SUCCESS_RESPONSE : resType;
        return { status: responseType, response: res };
    },
    promiseResponse: function (res, resType) {
        let responseType =
            resType === undefined ? appConstants.SUCCESS_RESPONSE : resType;
        return { status: responseType, response: res };
    },
    interpretErrorResponse(error) {
        let errorMessage = "";
        if (error.response === undefined) {
            errorMessage = "Please check your internet connectivity!";
        } else {
            errorMessage = error.response.data
                ? error.response.data
                : "Unable to handle request";
        }
        if (typeof errorMessage === "string") {
            return errorMessage;
        } else {
            return "Something went wrong!";
        }
    },
    numberWithCommasOnly: x => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
};
