import { Request, Response, NextFunction } from 'express';
import spotifyCredModel from "../models/spotifyCredModel";

const getSpotifyData = async(req: Request, res: Response) => {
    try {
        let data = await spotifyCredModel.find();
        if(data){
            res.status(200).json({
                error: false,
                data: data,
                message: 'User fteched successfully!'
            });
        }else{
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

export {
    getSpotifyData
}
