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
exports.getSpotifyData = void 0;
const spotifyCredModel_1 = __importDefault(require("../models/spotifyCredModel"));
const getSpotifyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield spotifyCredModel_1.default.find();
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
exports.getSpotifyData = getSpotifyData;
