import CONFIG from '../../js/config.js'
import axios from 'axios'
import qs from 'querystring'

const intialState = () => {
    return {
        captcha: '',
    }
}

export default {
    namespaced: true,
    state: intialState(),
    mutations: {
        SET: (state, [key, value]) => state[key] = value,
        RESET: (state) => Object.assign(state, intialState())
    },
    getters: {
        getCaptcha: (state) => () => state.captcha,
    },
    actions: {
        // GET CAPTCHA IMAGE
        getCheckcode: async function({commit}) {
            let res = await axios.get(CONFIG.SERVER_DOMAIN+'/checkcode')
            if (res.status === 200) {
                const { data } = res
                localStorage.setItem('captcha', data)
                commit('SET', ['captcha', data])
            }
        },
        // VERIFICATION CAPTCHA
        CheckcodeVerificataion: async function(checkcode) {
            let captchaResult = await axios.post(CONFIG.SERVER_DOMAIN+'/ajax/checkcode', qs.stringify({
                checkcode: checkcode
            }))
            return captchaResult
        },
    }
}