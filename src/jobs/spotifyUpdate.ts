import cron from "node-cron";
import axios from "axios";
import qs from "qs"
import dotenv from 'dotenv';
dotenv.config();
import spotifyCredModel from "../models/spotifyCredModel";

function spotifyUpdate() {
  const jobFunction = cron.schedule(`*/50 * * * *`, async () => {
    console.log("starting job...");

    try{
      let data = qs.stringify({
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
        data : data
      };

      axios.request(config)
      .then(async (response) => {
        const options = { upsert: true, new: true };
        await spotifyCredModel.findOneAndUpdate({}, response.data, options);
      })
      .catch((error) => {
        console.log(error);
      });

    }catch(e: any){

    }
  });

  jobFunction.start();
}

export default spotifyUpdate;
