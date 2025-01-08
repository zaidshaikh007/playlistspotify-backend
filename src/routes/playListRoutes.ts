import express from 'express';
import { playListData, addPlaylistData, getPlayListSongs, searchSong, addSongToPlaylist } from '../controllers/playListController';
const router = express.Router();
import { verifyToken }  from '../middleware/authMiddleware';

router.get('/getplaylistdata', verifyToken, playListData)
router.post('/addplaylist', verifyToken, addPlaylistData)
router.get('/getplaylistsongs', verifyToken, getPlayListSongs)
router.get('/searchsong', verifyToken, searchSong)
router.post('/addsongtoplaylist', verifyToken, addSongToPlaylist)

export default router;