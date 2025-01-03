<template>
    <red-background v-if="!isAuth || ($router.currentRoute.value.name === 'JoinMeeting' || $router.currentRoute.value.name === 'HostMeeting')" />
    <white-background v-else />
</template>
<script>
import axios from "axios";
import qs from "querystring";
import RedBackground from './components/RedBackground.vue';
import WhiteBackground from './components/WhiteBackground.vue';

import {mapGetters} from 'vuex'

export default {
    components: {
        RedBackground,
        WhiteBackground,
    },
    computed: {
        ...mapGetters({
          isAuth: 'auth/isAuth'
        })
    },
	async mounted() {
        // console.log(this.serialNum)
        // console.log(localStorage.getItem('accessToken'))
        // COBA 1
        // var bodyFormData = new FormData()
        // bodyFormData.append('email', 'yadi@jumpa.id')
        // bodyFormData.append('token', localStorage.getItem('accessToken'))
        // axios({
        //     method: "get",
        //     url: "http://103.157.46.61:8099/v1.0.0/profile/editInfo",
        //     data: bodyFormData,
        // })
        // .then(function (response) {
        //     //handle success
        //     console.log(response);
        // })
        // .catch(function (response) {
        //     //handle error
        //     console.log(response);
        // })
        // COBA 2
		// let res = await axios.post('https://surampak.jumpa.id/layanan/signup',{
        //     email: 'andika15ramdani@gmail.com',
        //     contact: 'Andika',
        //     name: 'Bussiness Name',
        //     enterprisePeople: '',
        //     checkcode: '',
        //     phone: 1,
        //     country: '',
        //     mac: '',
        //     province: '',
        //     companySize: ''
        // })
		// console.log('SIGNUP', res)
	},
}
</script>
<style>
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all .625s ease .5s;
}
.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(10%);
}
.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10%);
}
.slide-left-enter-from,
.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-10%);
}
.slide-right-enter-from,
.slide-right-leave-to {
    opacity: 0;
    transform: translateX(10%);
}
</style>
