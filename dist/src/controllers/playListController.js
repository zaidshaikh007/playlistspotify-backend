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
exports.searchSong = exports.getPlayListSongs = exports.addPlaylistData = exports.playListData = exports.addSongToPlaylist = void 0;
const axios_1 = __importDefault(require("axios"));
const playListModel_1 = __importDefault(require("../models/playListModel"));
const spotifyCredModel_1 = __importDefault(require("../models/spotifyCredModel"));
const playListData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield playListModel_1.default.find({
            user_id: req.user.user_id
        });
        if (data) {
            res.status(200).json({
                error: false,
                data: data,
                message: 'User fteched successfully!'
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
exports.playListData = playListData;
const addPlaylistData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield playListModel_1.default.create(Object.assign(Object.assign({}, req.body), { user_id: req.user.user_id }));
        if (data) {
            res.status(200).json({
                error: false,
                // data: data,
                message: 'Playlist Data Added'
            });
        }
        else {
            res.status(200).json({
                error: true,
                message: 'Error Adding playlist data!'
            });
        }
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.addPlaylistData = addPlaylistData;
const getPlayListSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield playListModel_1.default.findOne({
            _id: req.query.id
        });
        if (data) {
            res.status(200).json({
                error: false,
                data: data.songs,
                message: 'Songs fteched successfully!'
            });
        }
        else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching Songs Details!'
            });
        }
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.getPlayListSongs = getPlayListSongs;
const searchSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let spotifyData = yield spotifyCredModel_1.default.find();
        console.log(spotifyData);
        const response = yield axios_1.default.get('https://api.spotify.com/v1/search', {
            params: {
                q: req.query.name,
                type: 'track',
                limit: 10,
            },
            headers: {
                'Authorization': `Bearer ${spotifyData[0].access_token}`,
            },
        });
        const tracks = response.data.tracks.items;
        if (tracks) {
            res.status(200).json({
                error: false,
                data: tracks,
                message: 'Songs fteched successfully!'
            });
        }
        else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching Songs Details!'
            });
        }
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.searchSong = searchSong;
const addSongToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.id);
        let data = yield playListModel_1.default.findOneAndUpdate({ _id: req.body.id }, {
            $push: {
                songs: req.body.song,
            },
        }, { new: true });
        console.log('data: ', data);
        if (data) {
            res.status(200).json({
                error: false,
                // data: data,
                message: 'Song Added to playlist'
            });
        }
        else {
            res.status(200).json({
                error: true,
                message: 'Error Adding playlist data!'
            });
        }
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
});
exports.addSongToPlaylist = addSongToPlaylist;
