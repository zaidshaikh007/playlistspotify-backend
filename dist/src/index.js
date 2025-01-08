"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const playListRoutes_1 = __importDefault(require("./src/routes/playListRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const spotifyUpdate_1 = __importDefault(require("./src/jobs/spotifyUpdate"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
(0, database_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, cors_1.default)());
(0, spotifyUpdate_1.default)();
app.use('/api/user', userRoutes_1.default);
app.use('/api/playlist', playListRoutes_1.default);
app.use('/', (req, res) => {
    res.status(200).send("Welcome to spotify playlist");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
