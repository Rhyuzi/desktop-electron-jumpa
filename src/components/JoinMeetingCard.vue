<template>
	<div class="join-meeting">
        <div class="bg-white rounded-px5 p-px25 shadow-custom lg:p-10 max-w-lg">
            <h2 class="font-bold text-grey-black text-2xl lg:text-3xl text-center mb-5 lg:mb-px30">Join Meeting</h2>
			<form @submit.prevent="joinMeeting" class="flex flex-col gap-2.5 lg:gap-5 px-2.5 text-xs lg:text-sm">
				<div class="flex flex-col gap">
					<input type="text" v-model="joinMeetingData.meetId" placeholder="Enter the Meeting ID" class="border border-grey-ce rounded-px5 red-input outline-none">
                    <span v-if="v$.joinMeetingData.meetId.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.joinMeetingData.meetId.$errors[0].$message }}</span>
				</div>
				<div v-if="isAuth === false" class="flex flex-col gap">
					<input type="text" v-model="joinMeetingData.name" placeholder="Enter Your Name" class="border border-grey-ce rounded-px5 red-input outline-none">
                    <span v-if="v$.joinMeetingData.name.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.joinMeetingData.name.$errors[0].$message }}</span>
				</div>
				<div v-else class="flex-col gap hidden">
					<input type="hidden" v-model="joinMeetingData.name" placeholder="Enter Your Name" class="border border-grey-ce rounded-px5 red-input outline-none">
                    <span v-if="v$.joinMeetingData.name.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.joinMeetingData.name.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showPassword" type="text" v-model="joinMeetingData.meetPassword" placeholder="Meeting Password (If Required)" id="inputPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="joinMeetingData.meetPassword" placeholder="Meeting Password (If Required)" id="inputPassword" class="flex-1 outline-none">
						<button @click.left="visiblePassword" class="pr-2.5">
							<i v-if="showPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.joinMeetingData.meetPassword.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.joinMeetingData.meetPassword.$errors[0].$message }}</span>
				</div>
				<button v-if="v$.joinMeetingData.meetId.$error || v$.joinMeetingData.name.$error || v$.joinMeetingData.meetPassword.$error" type="submit" class="primary-button mt-2.5" disabled>JOIN MEETING</button>
				<button v-else type="submit" class="primary-button mt-2.5">JOIN MEETING</button>
			</form>
			<p v-if="isAuth === false" class="text-xs xl:text-sm text-grey-black mt-2.5 lg:mt-5 mx-auto w-max">Are you a host? 
				<router-link to="/host-meeting" class="font-bold hover:underline">Host Meeting</router-link>
			</p>
            <div v-if="isAuth === false" class="flex text-xs xl:text-sm text-linkblue mt-5 lg:mt-px30 px-2.5 w-full text-center">
                <router-link to='/' class="back-button flex-1">
                    <i class="fas fa-chevron-left pr-1"></i> Back to Welcome
                </router-link>
            </div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import useValidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
export default {
	name: 'JoinMeeting',
	data(){
		return {
			showPassword: false,
            v$: useValidate(),
			joinMeetingData: {
				meetId: '',
				name: localStorage.getItem('account') ?? '',
				meetPassword: ''
			}
		}
	},
    validations() {
        return {
			joinMeetingData: {
				meetId: { required, numeric },
				name: { required },
				meetPassword: { },
			}
        }
    },
    computed: {
        ...mapGetters({
          isAuth: 'auth/isAuth'
        })
    },
    methods: {
		visiblePassword() {
			this.showPassword = !this.showPassword
		},
        joinMeeting: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
				console.log('OKE', this.joinMeetingData)
            }
        },
    }
}
</script>