"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const { login, signup, profile } = require('../controllers/userController');
const router = express_1.default.Router();
router.post('/login', login);
router.post('/signup', signup);
router.get('/profile', authMiddleware_1.verifyToken, profile);
exports.default = router;
