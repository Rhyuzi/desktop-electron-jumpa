<template>
	<div id="forgotPassword">
		<div class="flex flex-col items-center bg-white rounded-px5 p-px30 shadow-custom xl:p-10">
			<h2 class="font-bold text-grey-black text-2xl xl:text-3xl text-center mb-2.5">Forgot Password?</h2>
            <img src="img/forgot-password.png" alt="" class="mx-auto py-px30">
            <p class="text-xs xl:text-sm text-grey-black text-center mb-2.5 font-bold">Enter the email address<br>associated with your account</p>
            <p class="text-xs xl:text-sm text-grey-black text-center mb-px30">we will email you a link to reset your password</p>
            <form @submit.prevent="sendToEmail" class="flex flex-col gap-2.5 xl:gap-5 px-2.5 text-xs xl:text-sm">
				<div class="flex flex-col gap">
					<input type="email" v-model="email" placeholder="Email" id="inputEmail" class="border border-grey-ce rounded-px5 red-input outline-none ">
                    <span v-if="v$.email.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.email.$errors[0].$message }}</span>
				</div>
				<button v-if="v$.email.$error" type="submit" class="primary-button mt-2.5" disabled>SEND LINK</button>
				<button v-else type="submit" class="primary-button mt-2.5">SEND LINK</button>
			</form>
		</div>
	</div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
	name: 'ForgotPassword',
    data() {
        return {
            v$: useValidate(),
            email: ''
        }
    },
    validations() {
        return {
            email: {required, email}
        }
    },
	computed: {
		checkEmptyInput: async function () {
			this.v$.$validate()
		}
	},
    methods: {
        sendToEmail: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
				this.$router.push({name: 'ForgotPasswordCheckEmail', params: {email: this.email}})
            }
        }
    }
}
</script>