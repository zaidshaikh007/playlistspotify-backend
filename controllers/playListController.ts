import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import playlistModel from "../models/playListModel";
import spotifyCredModel from "../models/spotifyCredModel";

const playListData = async (req: any, res: Response) => {
    try {
        let data = await playlistModel.find({
            user_id: req.user.user_id
        })
        if (data) {
            res.status(200).json({
                error: false,
                data: data,
                message: 'User fteched successfully!'
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching User Details!'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
};

const addPlaylistData = async (req: any, res: Response) => {
    try {
        let data = await playlistModel.create({
            ...req.body,
            user_id: req.user.user_id
        })
        if (data) {
            res.status(200).json({
                error: false,
                // data: data,
                message: 'Playlist Data Added'
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Error Adding playlist data!'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
};

const getPlayListSongs = async (req: Request, res: Response) => {
    try {
        let data = await playlistModel.findOne({
            _id: req.query.id
        })
        if (data) {
            res.status(200).json({
                error: false,
                data: data.songs,
                message: 'Songs fteched successfully!'
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching Songs Details!'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
};

const searchSong = async (req: Request, res: Response) => {
    try {
        let spotifyData = await spotifyCredModel.find();
        console.log(spotifyData);
        const response = await axios.get('https://api.spotify.com/v1/search', {
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
        } else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching Songs Details!'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
}

export const addSongToPlaylist = async (req: Request, res: Response) => {
    try {
        console.log(req.body.id)
        let data = await playlistModel.findOneAndUpdate(
            { _id: req.body.id },
            {
                $push: {
                    songs: req.body.song,
                },
            },
            { new: true }
        )
        console.log('data: ', data);
        if (data) {
            res.status(200).json({
                error: false,
                // data: data,
                message: 'Song Added to playlist'
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Error Adding playlist data!'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
};

export {
    playListData,
    addPlaylistData,
    getPlayListSongs,
    searchSong
}
