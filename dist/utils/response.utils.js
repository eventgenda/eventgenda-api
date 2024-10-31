"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponseStatus = successResponseStatus;
exports.errorResponseStatus = errorResponseStatus;
function successResponseStatus(response, message, data) {
    const dataResponse = {
        status: 200,
        message: message,
        success: true,
        data: data,
    };
    return response.status(200).json(dataResponse);
}
function errorResponseStatus(status, response, message, data) {
    const dataResponse = {
        status,
        message: message,
        success: false,
        data: data,
    };
    return response.status(status).json(dataResponse);
}
