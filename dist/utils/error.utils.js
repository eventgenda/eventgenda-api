"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const response_utils_1 = require("./response.utils");
const handleError = (res, err) => {
    if (err instanceof Error) {
        return (0, response_utils_1.errorResponseStatus)(500, res, err.message, null);
    }
    else {
        const error = err;
        return (0, response_utils_1.errorResponseStatus)(500, res, error.message, null);
    }
};
exports.handleError = handleError;
