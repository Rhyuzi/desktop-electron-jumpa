<template>
	<div class="join-meeting">
        <div class="bg-white rounded-px5 p-px25 shadow-custom lg:p-10 max-w-lg">
            <h2 class="font-bold text-grey-black text-2xl lg:text-3xl text-center mb-5 lg:mb-px30">Host Meeting</h2>
			<form @submit.prevent="hostMeeting" class="flex flex-col gap-2.5 lg:gap-5 px-2.5 text-xs lg:text-sm">
				<div class="flex flex-col gap">
					<input type="text" v-model="hostMeetingData.meetId" placeholder="Enter the Meeting ID" class="border border-grey-ce rounded-px5 red-input outline-none">
                    <span v-if="v$.hostMeetingData.meetId.$error" class="text-lightred text-xs">{{ v$.hostMeetingData.meetId.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<input type="text" v-model="hostMeetingData.hostCode" placeholder="Enter the Host Code" class="border border-grey-ce rounded-px5 red-input outline-none">
                    <span v-if="v$.hostMeetingData.hostCode.$error" class="text-lightred text-xs">{{ v$.hostMeetingData.hostCode.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<input type="text" v-model="hostMeetingData.name" placeholder="Enter Your Name" class="border border-grey-ce rounded-px5 red-input outline-none">
                    <span v-if="v$.hostMeetingData.name.$error" class="text-lightred text-xs">{{ v$.hostMeetingData.name.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showPassword" type="text" v-model="hostMeetingData.meetPassword" placeholder="Meeting Password (If Required)" id="inputPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="hostMeetingData.meetPassword" placeholder="Meeting Password (If Required)" id="inputPassword" class="flex-1 outline-none">
						<button @click.left="visiblePassword" class="pr-2.5">
							<i v-if="showPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.hostMeetingData.meetPassword.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.hostMeetingData.meetPassword.$errors[0].$message }}</span>
				</div>
				<button v-if="v$.hostMeetingData.meetId.$error || v$.hostMeetingData.hostCode.$error || v$.hostMeetingData.name.$error || v$.hostMeetingData.meetPassword.$error" type="submit" class="primary-button mt-2.5" disabled>JOIN MEETING</button>
				<button v-else type="submit" class="primary-button mt-2.5">JOIN MEETING</button>
			</form>
            <p class="text-xs xl:text-sm text-grey-black mt-2.5 lg:mt-5 mx-auto w-max">Want to join a meeting? 
				<router-link to="/join-meeting" class="font-bold hover:underline">Join Meeting</router-link>
			</p>
            <div class="flex text-xs xl:text-sm text-linkblue mt-5 lg:mt-px30 px-2.5 w-full text-center">
                <router-link to='/' class="back-button flex-1">
                    <i class="fas fa-chevron-left pr-1"></i> Back to Welcome
                </router-link>
            </div>
		</div>
	</div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
export default {
	name: 'HostMeeting',
	data(){
		return {
			showPassword: false,

            v$: useValidate(),
			hostMeetingData: {
				meetId: '',
				hostCode: '',
				name: '',
				meetPassword: ''
			}
		}
	},
    validations() {
        return {
			hostMeetingData: {
				meetId: { required, numeric },
				hostCode: { required },
				name: { required },
				meetPassword: { },
			}
        }
    },
    methods: {
		visiblePassword() {
			this.showPassword = !this.showPassword
		},
        hostMeeting: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
				console.log('OKE')
            }
        },
    }
}
</script>