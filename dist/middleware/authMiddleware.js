"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate' });
        }
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
