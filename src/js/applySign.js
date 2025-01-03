import CONFIG from './config'
import helper from './api_helper'

let { appID, appSecret, accessToken } = CONFIG
const { sortObj, generate_signature } = helper

export default {
    applySign: function (obj_param, timeStamp, body_param = null) {
        accessToken = localStorage.getItem('accessToken') || accessToken
        let obj_public = {appID, appSecret, timeStamp, accessToken};
        let obj = Object.assign({}, obj_public, obj_param);
        let obj_sign = sortObj(obj);
        return generate_signature(obj_sign, body_param);
    }
}