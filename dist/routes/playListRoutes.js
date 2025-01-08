"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playListController_1 = require("../controllers/playListController");
const router = express_1.default.Router();
const authMiddleware_1 = require("../middleware/authMiddleware");
router.get('/getplaylistdata', authMiddleware_1.verifyToken, playListController_1.playListData);
router.post('/addplaylist', authMiddleware_1.verifyToken, playListController_1.addPlaylistData);
router.get('/getplaylistsongs', authMiddleware_1.verifyToken, playListController_1.getPlayListSongs);
router.get('/searchsong', authMiddleware_1.verifyToken, playListController_1.searchSong);
router.post('/addsongtoplaylist', authMiddleware_1.verifyToken, playListController_1.addSongToPlaylist);
exports.default = router;
