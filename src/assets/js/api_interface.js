/** API INTERFACE */

import axios from "axios";

/** ACCOUNT */ 
let SERVER_DOMAIN = 'https://dinda.jumpa.id';
let API_URI = SERVER_DOMAIN + '/api/v1.0.0';
let appID = 10002;
let appSecret = '062C1FF7EAAD4CB3B5974C122068B9C3';
let accessToken = '';

function account_login(account, password){
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
    let result = send_api(endpoint, method);
    
    //RESULT PROCESS
    return result;
}
function account_logout(){
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
    let result = send_api(endpoint, method);
    //RESULT PROCESS
    return result;
}

/** ROOM RESOURCE */
function room_list(pageIndex, pageSize){
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
    let result = send_api(endpoint, method);

    //RESULT PROCESS
    return result;
}

/** MEETING */
function meeting_list(pageSize){
    //DEFINE API ENDPOINT
    let endpoint = '/room/list';
    let method = 'get';
    let timeStamp = (new Date).getTime();

    //GENERATE SIGNATURE
    let obj_param = {pageSize:pageSize};
    let source_signature = applySign(obj_param, timeStamp);
    

    //ASIGN PARAM URL
    let public_param = publicParam(timeStamp);
    let params = '&pageSize='+pageSize;
    let signature = '&signature='+source_signature;

    //SEND API
    endpoint = endpoint + '?' + public_param + params + signature;
    let result = send_api(endpoint, method);

    //RESULT PROCESS
    return result;
}
function meeting_quick_start(data){
    //DEFINE API ENDPOINT
    let endpoint = '/room/quick_start';
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}
function meeting_schedule(data){
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}
function meeting_details(meetingSerialNum){
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
    let result = send_api(endpoint, method);

    //RESULT PROCESS
    return result;
}
function meeting_edit(data){
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}
function meeting_launch(data){
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}
function meeting_cancel(data){
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}
function meeting_end(data){
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}
function meeting_delete(data){
    //DEFINE API ENDPOINT
    let endpoint = '/room/delete';
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
    let result = send_api(endpoint, method, data);

    //RESULT PROCESS
    return result;
}

/** Calculation Interface */
function generate_signature(obj, body_param=null){
    let data = '&';
    if (!obj.accessToken) delete obj.accessToken;
    for (let i = 0; i < Object.keys(obj).length; i++) {
        let a = Object.keys(obj)[i].toString();
        data += Object.keys(obj)[i] + '=' + obj[a] + "&";
    }
    console.error('data signature: ', data);
    if (body_param) {
        return sha256(data + body_param + '&');
    } else {
        return sha256(data);
    }
}

function send_api(endpoint, method, data=null){
    let respon = false;
    axios.post(API_URI+endpoint, data)
    .then(function (response) {
        respon = response
    })
    .catch((error) => {
        console.error(error)
    })
    // $.ajax({
    //     url: API_URI + endpoint,
    //     type: method,
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     data: data,
    //     async: false,
    //     success: function(responseu){
    //         console.error('responseu:', responseu);
    //         respon = responseu;
    //     }
    // });
    return respon;
}

function publicParam(timeStamp){
    let token = ''; if (accessToken) token = 'accessToken='+accessToken+'&';
    return token+'appID='+appID+'&appSecret='+appSecret+'&timeStamp='+timeStamp;
}

function sortObj(obj){
    return Object.keys(obj).sort().reduce((result, key) => Object.assign(result, { [key]: obj[key] }), {});
}

function applySign(obj_param, timeStamp, body_param = null){
    let obj_public = {appID:appID, appSecret:appSecret, timeStamp:timeStamp, accessToken:accessToken};
    let obj = Object.assign({}, obj_public, obj_param);
    let obj_sign = sortObj(obj);
    return signature = generate_signature(obj_sign, body_param);
}