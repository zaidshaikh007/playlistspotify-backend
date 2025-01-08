"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cronJobs;
const spotifyUpdate_1 = __importDefault(require("./spotifyUpdate"));
function cronJobs() {
    (0, spotifyUpdate_1.default)();
}
