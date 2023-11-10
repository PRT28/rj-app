import axios from "axios";
import { config } from "../config/config";

export const randomAsset = async token => {
    const url = `${config.baseUrl}${config.asset}`;
    console.log('abc', token)
    const headers = {
        "Authorization": `${token}`
    }
    return axios.get(url, {
        headers
    })
                    .then(data => data)
                    .catch(err => { throw err });
}