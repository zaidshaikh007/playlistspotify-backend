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
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const spotifyCredModel_1 = __importDefault(require("../models/spotifyCredModel"));
function spotifyUpdate() {
    const jobFunction = node_cron_1.default.schedule(`*/50 * * * *`, () => __awaiter(this, void 0, void 0, function* () {
        console.log("starting job...");
        try {
            let data = qs_1.default.stringify({
                'grant_type': process.env.GRANT_TYPE,
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.CLIENT_SECRET
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
            axios_1.default.request(config)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                const options = { upsert: true, new: true };
                yield spotifyCredModel_1.default.findOneAndUpdate({}, response.data, options);
            }))
                .catch((error) => {
                console.log(error);
            });
        }
        catch (e) {
        }
    }));
    jobFunction.start();
}
exports.default = spotifyUpdate;
