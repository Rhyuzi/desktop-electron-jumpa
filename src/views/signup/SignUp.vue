<template>
	<notification-toast
		v-if=toast.active
		:notifMessage=toast.notifMessage
		:notifType=toast.notifType />
	<div class="sign-up">
		<transition name="slide-up" appear>
			<div class="bg-white rounded-px5 p-px25 shadow-custom lg:p-10 max-w-lg">
				<h2 class="font-bold text-grey-black text-2xl lg:text-3xl text-center mb-5 lg:mb-px30">Sign Up</h2>
				<form @submit.prevent="signUp" class="flex flex-col gap-2.5 lg:gap-5 px-2.5 text-xs lg:text-sm">
					<div class="flex flex-col gap">
						<input type="email" v-model="signUpData.email" placeholder="Email" id="inputEmail" class="border border-grey-ce rounded-px5 red-input outline-none ">
						<span v-if="v$.signUpData.email.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.signUpData.email.$errors[0].$message }}</span>
					</div>
					<div class="flex flex-col gap">
						<input type="text" v-model="signUpData.displayName" placeholder="Display Name" id="inputDisplayName" class="border border-grey-ce rounded-px5 red-input outline-none ">
						<span v-if="v$.signUpData.displayName.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.signUpData.displayName.$errors[0].$message }}</span>
					</div>
					<div class="flex flex-col gap">
						<div class="flex justify-between items-center gap-4">
							<input type="text" v-model="signUpData.checkcode" placeholder="Verification Code" id="captcha" maxlength="4" class="flex-1 border border-grey-ce rounded-px5 outline-none py-2 px-4">
							<img src="https://surampak.jumpa.id/checkcode">
						</div>
						<span v-if="v$.signUpData.checkcode.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.signUpData.checkcode.$errors[0].$message }}</span>
					</div>
					<button v-if="v$.signUpData.displayName.$error || v$.signUpData.email.$error || v$.signUpData.checkcode.$error" type="submit" class="primary-button mt-2.5" disabled>SIGN UP</button>
					<button v-else type="submit" class="primary-button mt-2.5">SIGN UP</button>
				</form>
				<p class="text-xs xl:text-sm text-grey-black mt-2.5 lg:mt-5 mx-auto w-max">Already have an account? 
					<router-link to="/sign-in" class="font-bold hover:underline">Sign In</router-link>
				</p>
				<div class="flex text-xs xl:text-sm text-linkblue mt-5 lg:mt-px30 px-2.5 w-full text-center">
					<router-link to='/' class="back-button flex-1">
						<i class="fas fa-chevron-left pr-1"></i> Back to Welcome
					</router-link>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import NotificationToast from '../../components/NotificationToast.vue'
export default {
  components: { NotificationToast },
	name: 'SignUp',
	data() {
		return{
            v$: useValidate(),
			toast: {
				active: false,
				notifMessage: '',
				notifType: 0
			},
			signUpData: {
				email: '',
				displayName: '',
				checkcode: '',
			}
		}
	},
    validations() {
        return {
			signUpData: {
				email: { required, email },
				displayName: { required },
				checkcode: {
					required,
					minLength: minLength(4),
					maxLength: maxLength(4)
				}
			}
        }
    },
	computed: {
		...mapGetters({
			checkcode: 'captcha/getCaptcha'
		}),
		checkEmptyInput: async function () {
			this.v$.$validate()
		}
	},
	async created() {
		await this.$store.dispatch('captcha/getCheckcode')
	},
	methods: {
		signUp: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
                let signUpResult = await this.$store.dispatch('auth/signUp', {
					email: this.signUpData.email,
					displayName: this.signUpData.displayName,
					name: '',
					enterprisePeople: '',
					checkcode: this.signUpData.checkcode,
					phone: 1,
					country: '',
					mac: '',
					province: '' ,
					companySize: ''
                });
				if (signUpResult[0] !== 0) {
					if (signUpResult[0] === 1) {
						this.toast.notifMessage = 'The Email already in use'
					} else {
						this.toast.notifMessage = signUpResult[1]
					}
					console.error(signUpResult[1]);
					this.toast.active = true
					this.toast.notifType = 2
					setTimeout(() => {
						this.toast.active = false
					}, 2975)
				} else {
					this.$router.push({name: 'SignUpCheckEmail', params: {email: this.signUpData.email, displayName: this.signUpData.displayName}})
				}
            }
        }
	}
}
</script>