"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signup = exports.login = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const { verifyPassword, generateToken, hashPassword } = require("../utils/authUtils");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'Please provide email and password!' });
        }
        let user = yield userModel_1.default.findOne({
            email
        });
        const isValid = yield verifyPassword(password, user.password);
        if (!isValid)
            return res.status(401).json({ error: true, message: 'Invalid credentials' });
        const token = generateToken({ id: user.id, email: user.email });
        if (user) {
            res.status(200).json({
                error: false,
                data: token,
                message: 'User fetched successfully!'
            });
        }
        else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching User Details!'
            });
        }
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, mobile, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: true, message: 'Please provide all required fields!' });
        }
        const hashedPassword = yield hashPassword(password);
        yield userModel_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        res.status(200).json({
            error: false,
            message: 'User Created successfully!'
        });
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.signup = signup;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.user.user_id).select('-password');
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found!' });
        }
        res.status(200).json({
            error: false,
            data: user,
            message: 'User fetched successfully!'
        });
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.profile = profile;
