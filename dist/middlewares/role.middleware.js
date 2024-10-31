"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ msg: 'Unauthenticated user' });
            }
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ msg: 'Access denied' });
            }
            next();
        }
        catch (err) {
            const error = err;
            return res.status(500).json({ msg: error.message });
        }
    };
};
exports.default = authorizeRoles;
