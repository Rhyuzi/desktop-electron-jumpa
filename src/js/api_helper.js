import axios from 'axios'
import sha256 from 'crypto-js/sha256'
import CONFIG from './config'

let { SERVER_DOMAIN, appID, appSecret, accessToken } = CONFIG
const API_URI = SERVER_DOMAIN + '/api/v1.0.0'

export default {
    generate_signature: function (obj, body_param=null) {
        let data = '&';
        if (!obj.accessToken) delete obj.accessToken;
        for (let i = 0; i < Object.keys(obj).length; i++) {
            let a = Object.keys(obj)[i].toString();
            data += Object.keys(obj)[i] + '=' + obj[a] + "&";
        }
        // console.error('data signature: ', data);
        if (body_param) {
            return sha256(data + body_param + '&');
        } else {
            return sha256(data);
        }
    },
    
    send_api: async function (endpoint, method, data) {
        if (method === 'post') {
            return await axios.post(`${API_URI}${endpoint}`, data);
        } else if (method === 'get') {
            return await axios.get(`${API_URI}${endpoint}`, data);
        }
    },

    publicParam: function (timeStamp) {
        let token = ''; 
        accessToken = localStorage.getItem('accessToken') || accessToken;
        if (accessToken) token = 'accessToken='+accessToken+'&';
        return token+'appID='+appID+'&appSecret='+appSecret+'&timeStamp='+timeStamp;
    },

    sortObj: function (obj) {
        return Object.keys(obj).sort().reduce((result, key) => Object.assign(result, { [key]: obj[key] }), {});
    }
}