"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_list_1 = __importDefault(require("../config/roles_list"));
const verifyIdOrRoles = () => {
    return (req, res, next) => {
        const userRoles = req === null || req === void 0 ? void 0 : req.roles;
        const userId = req === null || req === void 0 ? void 0 : req.id;
        // Stop if no userRoles
        if (!userRoles)
            return res
                .status(401)
                .json({ status: 'fail', message: 'Unauthorized access' });
        // If role is Admin => get access to the resource
        if (userRoles.includes(roles_list_1.default.Admin)) {
            console.log('Request sent by admin user');
            return next();
        }
        // If role is User
        else if (userRoles.includes(roles_list_1.default.User)) {
            const userHasUserRole = userRoles.includes(roles_list_1.default.User);
            // check if the id is the same coming from the request
            const isAccessingOwnResource = userHasUserRole && userId === req.params.id;
            if (!isAccessingOwnResource) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Unauthorized: Resource access not allowed.',
                });
            }
            return next();
        }
        // If role is not admin or user => no access
        else {
            return res
                .status(401)
                .json({
                status: 'fail',
                message: 'Unauthorized: Admin role required.',
            });
        }
    };
};
exports.default = verifyIdOrRoles;
