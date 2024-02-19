"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
        return res.status(403).send({ message: "Not authorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authorizationToken, config_1.JWT_SECRET);
        if (!decoded) {
            return res.status(403).send({ message: "Not authorized" });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).send({ message: "Not authorized" });
    }
};
exports.default = authMiddleware;
