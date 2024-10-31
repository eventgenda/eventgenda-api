"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_utils_1 = require("../utils/response.utils");
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return (0, response_utils_1.errorResponseStatus)(401, res, 'Invalid Authentication.', null);
        }
        const token = authHeader.split(' ')[1];
        if (!token)
            return (0, response_utils_1.errorResponseStatus)(401, res, 'Invalid Authentication.', null);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) {
                return (0, response_utils_1.errorResponseStatus)(401, res, error.message, null);
            }
            req.user = user;
            next();
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ msg: error.message });
    }
};
exports.default = verifyToken;
