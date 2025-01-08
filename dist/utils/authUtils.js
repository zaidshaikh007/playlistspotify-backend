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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtSecretKey = process.env.JWT_SECRET || "";
dotenv_1.default.config();
const generateToken = (user) => {
    try {
        const payload = {
            user_id: user.id,
            email: user.email
        };
        const options = { expiresIn: '1d' };
        const token = jsonwebtoken_1.default.sign(payload, jwtSecretKey, options);
        return token;
    }
    catch (error) {
        return `Error : ${error}`;
    }
};
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
});
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
    return isMatch;
});
module.exports = { generateToken, hashPassword, verifyPassword };
