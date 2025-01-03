import sha256 from 'crypto-js/sha256'
import APPLYSIGN from './applySign'
import helper from './api_helper'

const { applySign } = APPLYSIGN
const { publicParam, send_api } = helper

export default {
    /** ACCOUNT */ 
    // ACCOUNT LOGIN
    account_login: async function (account, password) {
        //DEFINE API ENDPOINT
        let endpoint = '/account/login';
        let method = 'get';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        let obj_param = {account:account, password:password};
        let source_signature = applySign(obj_param, timeStamp);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '&account='+account+'&password='+password;
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method);
        
        //RESULT PROCESS
        return result;
    },

    // ACCOUNT LOGOUT
    account_logout: async function () {
        //DEFINE API ENDPOINT
        let endpoint = '/account/logout';
        let method = 'get';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        let obj_param = {};
        let source_signature = applySign(obj_param, timeStamp);
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method);
        //RESULT PROCESS
        return result;
    },

    /** ROOM RESOURCE */
    room_list: async function (pageIndex, pageSize) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/resource/list';
        let method = 'get';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        let obj_param = {pageIndex:pageIndex, pageSize:pageSize};
        let source_signature = applySign(obj_param, timeStamp);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '&pageIndex='+pageIndex+'&pageSize='+pageSize;
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method);
    
        //RESULT PROCESS
        return result;
    },

    /** MEETING */
    meeting_list: async function (pageSize, meetingState) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/list';
        let method = 'get';
        let timeStamp = (new Date).getTime();

        //GENERATE SIGNATURE
        let obj_param = {meetingState, pageSize};
        let source_signature = applySign(obj_param, timeStamp);
        

        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '&meetingState='+meetingState+'&pageSize='+pageSize;
        let signature = '&signature='+source_signature;

        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method);

        //RESULT PROCESS
        return result;
    },

    meeting_quick_start: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/quick_start';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        let dataStr = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(dataStr);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    },

    meeting_schedule: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/schedule';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        data = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(data);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    },

    meeting_details: async function (meetingSerialNum) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/detail';
        let method = 'get';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
    
        // enable two line below when method is post
        // data = JSON.stringify(data);
        // let body_param = sha256(data);
    
        let obj_param = {meetingSerialNum:meetingSerialNum};
        let source_signature = applySign(obj_param, timeStamp);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '&meetingSerialNum='+meetingSerialNum;
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method);
    
        //RESULT PROCESS
        return result;
    },

    meeting_edit: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/edit';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        data = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(data);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    },

    meeting_launch: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/launch';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        data = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(data);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    },

    meeting_cancel: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/cancel';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        data = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(data);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    },

    meeting_end: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/end';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        data = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(data);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    },

    meeting_delete: async function (data) {
        //DEFINE API ENDPOINT
        let endpoint = '/room/delete';
        let method = 'post';
        let timeStamp = (new Date).getTime();
    
        //GENERATE SIGNATURE
        let dataStr = JSON.stringify(data);
        let obj_param = {};
        let body_param = sha256(dataStr);
        let source_signature = applySign(obj_param, timeStamp, body_param);
        
    
        //ASIGN PARAM URL
        let public_param = publicParam(timeStamp);
        let params = '';
        let signature = '&signature='+source_signature;
    
        //SEND API
        endpoint = endpoint + '?' + public_param + params + signature;
        let result = await send_api(endpoint, method, data);
    
        //RESULT PROCESS
        return result;
    }
}