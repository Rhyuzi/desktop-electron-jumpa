<template>
	<div id="createNewtPassword">
		<div class="flex flex-col items-center bg-white rounded-px5 p-px30 shadow-custom xl:p-10">
			<h2 class="font-bold text-grey-black text-2xl xl:text-3xl text-center mb-2.5">Create New Password</h2>
            <img src="img/key-password.png" alt="" class="mx-auto py-px30">
            <p class="text-xs xl:text-sm text-grey-black text-center mb-px30">Set the new password for your account</p>
            <form @submit.prevent="createNewPassword" class="flex flex-col gap-2.5 xl:gap-5 px-2.5 text-xs xl:text-sm">
                <div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showOldPassword" type="text" v-model="newPasswordData.oldPassword" placeholder="Old Password" id="inputOldPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="newPasswordData.oldPassword" placeholder="Old Password" id="inputOldPassword" class="flex-1 outline-none">
						<button @click.left="visibleOldPassword" class="pr-2.5">
							<i v-if="showOldPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.newPasswordData.oldPassword.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.newPasswordData.oldPassword.$errors[0].$message }}</span>
                    <span v-else class="text-px8 xl:text-px10 text-grey-gray mt-px5">8-16 characters, contain two types of digits, letters or symbols</span>
				</div>
                <div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showPassword" type="text" v-model="newPasswordData.password" placeholder="New Password" id="inputPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="newPasswordData.password" placeholder="New Password" id="inputPassword" class="flex-1 outline-none">
						<button @click.left="visiblePassword" class="pr-2.5">
							<i v-if="showPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.newPasswordData.password.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.newPasswordData.password.$errors[0].$message }}</span>
                    <span v-else class="text-px8 xl:text-px10 text-grey-gray mt-px5">8-16 characters, contain two types of digits, letters or symbols</span>
				</div>
				<div class="flex flex-col gap">
					<div class="flex gap-px5 border border-grey-ce rounded-px5 red-input">
						<input v-if="showConfirmPassword" type="text" v-model="newPasswordData.confirmPassword" placeholder="Confirm Password" id="inputConfirmPassword" class="flex-1 outline-none">
						<input v-else type="password" v-model="newPasswordData.confirmPassword" placeholder="Confirm Password" id="inputConfirmPassword" class="flex-1 outline-none">
						<button @click.left="visibleConfirmPassword" class="pr-2.5">
							<i v-if="showConfirmPassword" class="fas fa-eye text-grey-black text-xs"></i>
							<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
						</button>
					</div>
                    <span v-if="v$.newPasswordData.confirmPassword.$error" class="text-lightred text-px8 xl:text-px10 mt-px5">{{ v$.newPasswordData.confirmPassword.$errors[0].$message }}</span>
				</div>
				<button v-if="v$.newPasswordData.password.$error || v$.newPasswordData.confirmPassword.$error" type="submit" class="primary-button mt-2.5" disabled>CHANGE PASSWORD</button>
				<button v-else type="submit" class="primary-button mt-2.5">CHANGE PASSWORD</button>
			</form>
		</div>
	</div>
</template>
<script>
import md5 from 'crypto-js/md5'
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'
export default {
	name: 'CreateNewPassword',
    data() {
        return {
			showOldPassword: false,
			showPassword: false,
			showConfirmPassword: false,

            email: '',

            v$: useValidate(),
            newPasswordData: {
				oldPassword: '',
                password: '',
                confirmPassword: '',
            },
        }
    },
    validations() {
        return {
            newPasswordData: {
                oldPassword: {
                    required,
                },
                password: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(16)
                },
                confirmPassword: {
                    required,
                    password: sameAs(this.newPasswordData.password)
                }
            }
        }
    },
	computed: {
		checkEmptyInput: async function () {
			this.v$.$validate()
		}
	},
    methods: {
		visibleOldPassword() {
			this.showOldPassword = !this.showOldPassword
		},
		visiblePassword() {
			this.showPassword = !this.showPassword
		},
		visibleConfirmPassword() {
			this.showConfirmPassword = !this.showConfirmPassword
		},
        createNewPassword: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
				await this.$store.dispatch('auth/changePassword', {
					oldPwd: md5(md5(this.newPasswordData.oldPassword)),
					newPwd: md5(md5(this.newPasswordData.password))
				})
				// this.$router.push({name: 'ResetPasswordSuccess'})
            }
        }
    }
}
</script>