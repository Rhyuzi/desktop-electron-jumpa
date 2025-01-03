import API from '../../js/api_interface'
import CONFIG from '../../js/config.js'
import Captcha from './captcha'
import axios from 'axios'
import router from '../../router'
import qs from 'querystring'

const intialState = () => {
    return {
        isAuth: false,
        accessToken: '',
        account: '',
        bio: '',
        displayName: '',
        email: '',
        accountInfo: {}
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
        isAuth: (state) => state.isAuth,
        getToken: (state) => () => state.accessToken,
        getAccount: (state) => () => state.account,
        getCaptcha: (state) => () => state.captcha,
        getEmail: (state) => () => state.email,
        getAccountInfo: (state) => () => state.accountInfo,
    },
    actions: {
        // SIGNUP
        signUp: async function({commit}, payload) {
            let checkEmailRes = await axios.post(CONFIG.SERVER_DOMAIN+'/ajax/checkEmail', qs.stringify({
                email: payload.email
            }))
            if (checkEmailRes.data.state === 0) {
                let captchaRes = await Captcha.actions.CheckcodeVerificataion(payload.checkcode)
                if (captchaRes.data.state === 0) {
                    let res = await axios.post(CONFIG.SERVER_DOMAIN+'/signup', qs.stringify({
                        email: payload.email,
                        contact: payload.displayName,
                        name: payload.bussinessName,
                        enterprisePeople: payload.enterprisePeople,
                        checkcode: payload.checkcode,
                        phone: payload.phone,
                        country: payload.country,
                        mac: payload.mac,
                        province: payload.province,
                        companySize: payload.companySize
                    }))
                    return [0, '']
                } else {
                    return [2, captchaRes.data.msg]
                }
            } else {
                return [1, checkEmailRes.data.msg]
            }
        },
        // SIGNIN
        signIn: async function({commit}, payload) {
            const signInRes = await API.account_login(payload.account, payload.password);
            let data = signInRes.data
            if (data.retCode == 0) {
                const { accessToken, account, email } = data.data
                let infoRes = await axios.post(CONFIG.SERVER_DOMAIN+'/layanan/profile/editInfoGet', qs.stringify({
                    email: email,
                    token: accessToken,
                }))
                let infos = infoRes.data
                if (infos.error == false) {
                    const { bio, comment } = infos
                    
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('account', account)
                    localStorage.setItem('bio', bio)
                    localStorage.setItem('displayName', comment)
                    localStorage.setItem('email', email)

                    commit('SET', ['isAuth', true])
                    commit('SET', ['accessToken', accessToken])
                    commit('SET', ['email', email])
                    commit('SET', ['bio', bio])
                    commit('SET', ['displayName', comment])
                    commit('SET', ['account', account])

                    router.push(router.currentRoute.value.query.redirect || '/home')
                    return [0, '']
                } else {
                    return [1, infos]
                }
            } else {
                return [1, data.errorMsg]
            }
        },
        // CHANGE PASSWORD
        changePassword: async function({commit}, payload) {
            let res = await axios.post(CONFIG.SERVER_DOMAIN+'/settings/password', qs.stringify({
                oldPwd: payload.oldPwd,
                newPwd: payload.newPwd,
            }))
            console.log('PASSWORD CHANGE', res);
            // let response = res.data
            // if (response.error == false) {
            //     // const { photo } = response
            //     // localStorage.setItem('photo', photo)
            //     // commit('SET', ['photo', photo])
            // }
        },
        
        signOut: async function({commit}) {
            const res = await API.account_logout();
            let data = res.data

            if (data.retCode == 0) {
                localStorage.clear()
                commit('RESET')
                router.push('/sign-in')
            }
        }
    }
}