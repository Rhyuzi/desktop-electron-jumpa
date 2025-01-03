<template>
	<div class="setupAccount">
		<div class="bg-white rounded-px5 p-px25 shadow-custom lg:p-10 max-w-lg">
			<h2 class="font-bold text-grey-black text-2xl lg:text-3xl text-center mb-5 lg:mb-px30">Set up account</h2>
			<form @submit.prevent="setupAccount" class="flex flex-col gap-2.5 lg:gap-5 px-2.5 text-xs lg:text-sm">
				<div class="flex flex-col gap">
					<input type="email" v-model="setupAccountData.email" placeholder="Email" id="inputEmail" class="border border-grey-ce rounded-px5 red-input outline-none" :disabled="setupAccountData.email">
                    <span v-if="v$.setupAccountData.email.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.setupAccountData.email.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<input type="text" v-model="setupAccountData.displayName" placeholder="Display Name" id="inputDisplayName" class="border border-grey-ce rounded-px5 red-input outline-none" :disabled="setupAccountData.displayName">
                    <span v-if="v$.setupAccountData.displayName.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.setupAccountData.displayName.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<input type="text" v-model="setupAccountData.username" placeholder="Username" id="inputUsername" class="border border-grey-ce rounded-px5 red-input outline-none ">
                    <span v-if="v$.setupAccountData.username.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.setupAccountData.username.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showPassword" type="text" v-model="setupAccountData.password" placeholder="Password" id="inputPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="setupAccountData.password" placeholder="Password" id="inputPassword" class="flex-1 outline-none">
						<button @click.left="visiblePassword" class="pr-2.5">
							<i v-if="showPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.setupAccountData.password.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.setupAccountData.password.$errors[0].$message }}</span>
				</div>
				<div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showConfirmPassword" type="text" v-model="setupAccountData.confirmPassword" placeholder="Confirm Password" id="inputConfirmPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="setupAccountData.confirmPassword" placeholder="Confirm Password" id="inputConfirmPassword" class="flex-1 outline-none">
						<button @click.left="visibleConfirmPassword" class="pr-2.5">
							<i v-if="showConfirmPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.setupAccountData.confirmPassword.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.setupAccountData.confirmPassword.$errors[0].$message }}</span>
				</div>
				<button v-if="v$.setupAccountData.email.$error || v$.setupAccountData.displayName.$error || v$.setupAccountData.username.$error || v$.setupAccountData.password.$error || v$.setupAccountData.confirmPassword.$error" type="submit" class="primary-button mt-2.5" disabled>REGISTER</button>
				<button v-else type="submit" class="primary-button mt-2.5">REGISTER</button>
			</form>
			<p class="text-xs xl:text-sm text-grey-black mt-2.5 lg:mt-5 mx-auto w-max">Already have an account? 
				<router-link to="/sign-in" class="font-bold hover:underline">Sign In</router-link>
			</p>
			<div class="flex text-xs xl:text-sm text-linkblue mt-5 lg:mt-5 px-2.5 w-full text-center">
				<router-link to='/' class="back-button flex-1">Cancel</router-link>
			</div>
		</div>
	</div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email, sameAs, minLength, maxLength } from '@vuelidate/validators'
export default {
	name: 'SetupAccount',
	data() {
		return{
			showPassword: false,
			showConfirmPassword: false,
            v$: useValidate(),
			setupAccountData: {
				email: this.$route.params.email,
				displayName: this.$route.params.displayName,
                username: '',
                password: '',
                confirmPassword: ''
			}
		}
	},
    validations() {
        return {
			setupAccountData: {
				email: { required, email },
				displayName: { required },
				username: { required },
                password: {
					required,
					minLength: minLength(8),
					maxLength: maxLength(16)
				},
                confirmPassword: {
                    required,
                    password: sameAs(this.setupAccountData.password)
                }
			}
        }
    },
	methods: {
		visiblePassword() {
			this.showPassword = !this.showPassword
		},
		visibleConfirmPassword() {
			this.showConfirmPassword = !this.showConfirmPassword
		},
		setupAccount: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
				// this.$router.push({name: 'RegistrationSuccess', params: {email: this.setupAccountData.email, displayName: this.setupAccountData.displayName}})
                // let res = await this.$store.dispatch('auth/setupAccount', {
                //     email: this.email,
                //     displayName: this.displayName,
                //     nickname: this.nickname
                // });
                // console.log(res);
            }
        }
	}
}
</script>