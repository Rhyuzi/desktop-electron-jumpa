import CONFIG from '../../js/config.js'
import axios from 'axios'
import qs from 'querystring'

const intialState = () => {
    return {
        bio: '',
        comment: '',
        photo: '',

        timezoneLists: []
    }
}
    
export default {
    namespaced: true,
    state: intialState(),
    mutations: {
        SET: (state, [key, value]) => state[key] = value,
        PUSH: (state, [key, value]) => state[key].push(value),
        // DELETE: (state, [key, value]) => state[key].filter(item => item.meetingSerialNum != value),
        RESET: (state) => Object.assign(state, intialState())
    },
    getters: {
        getBio: (state) => state.bio,
        getComment: (state) => state.comment,
        getPhoto: (state) => state.photo,
        getTimezone: (state) => state.timezoneLists,
    },
    actions: {
        // GET PICTURE
        getPicture: async function({commit}, payload) {
            let res = await axios.post(CONFIG.SERVER_DOMAIN+'/layanan/profile/editPictureGet', qs.stringify({
                email: payload.email,
                token: payload.token,
            }))
            console.log('GET PHOTO', res);
            let response = res.data
            if (response.error == false) {
                const { photo } = response
                localStorage.setItem('photo', photo)
                commit('SET', ['photo', photo])
            }
        },
        // UPLOAD PICTURE
        uploadPicture: async function({commit}, payload) {
            var bodyFormData = new FormData()
            bodyFormData.append('email', payload.email)
            bodyFormData.append('imageFile', payload.file)
            bodyFormData.append('token', payload.token)
            axios({
                method: "post",
                url: CONFIG.SERVER_DOMAIN+"/layanan/profile/editPicture",
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log('TRY TO UPLOAD', response);
            })
            .catch(function (response) {
                //handle error
                console.error('ERROR TO UPLOAD', response);
            })
        },
        // UPDATE INFO
        updateInfo: async function({commit}, payload) {
            let res = await axios.post(CONFIG.SERVER_DOMAIN+'/layanan/profile/editInfo', qs.stringify({
                email: payload.email,
                comment: payload.comment,
                bio: payload.bio,
                token: payload.token,
            }))
            console.log(res);
        },
        // GET SYSTEM DATA
        getSystemData: async function({commit}, payload) {            
            let systemRes = await axios.post(CONFIG.SERVER_DOMAIN+'/layanan/profile/editSistemGet', qs.stringify({
                email: payload.email,
                token: payload.accessToken,
            }))
            localStorage.setItem('timezoneLists', systemRes.data.timezoneList)
            commit('SET', ['timezoneLists', systemRes.data.timezoneList])
        }
        
    }
}