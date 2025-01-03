<template>
	<div id="contactEdit" class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
            <div class="bg-white rounded-px5 mx-auto border border-grey-disable flex flex-col items-center">
                <form @submit.prevent="contactEdit" class="mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 flex-1 flex flex-col items-center">
                    <div class="flex flex-col gap-px5 lg:gap-2">
                        <img :src=profileImage :alt=profileName class="bg-grey-black rounded-full w-28 lg:w-32 xl:w-36 2xl:w-40 h-28 lg:h-32 xl:h-36 2xl:h-40 object-cover mt-2.5 lg:mt-3 xl:mt-4 2xl:mt-5 mx-auto">
                        <div class="flex flex-col flex-1 gap-0.5 red-input px-8">
                            <label class="text-px10 text-grey-gray">Contact Name</label>
                            <input type="text" v-model="contactEditData.contactName" class="rounded-px5 border border-grey-ce py-px5 px-2.5 text-xs lg:text-sm xl:text-base 2xl:text-lg font-bold outline-none text-grey-ed">
                            <p v-if="v$.contactEditData.contactName.$error" class="text-px8 text-lightred min-w-max">{{ v$.contactEditData.contactName.$errors[0].$message }}</p>
                        </div>
                        <div class="flex flex-col flex-1 gap-0.5 red-input px-8">
                            <label class="text-px10 text-grey-gray">Email *</label>
                            <input type="email" v-model="contactEditData.email" class="rounded-px5 border border-grey-ce py-px5 px-2.5 text-xs lg:text-sm xl:text-base 2xl:text-lg font-bold outline-none text-grey-ed">
                            <p v-if="v$.contactEditData.email.$error" class="text-px8 text-lightred min-w-max">{{ v$.contactEditData.email.$errors[0].$message }}</p>
                        </div>
                        <div class="flex flex-col flex-1 gap-0.5 red-input px-8">
                            <label class="text-px10 text-grey-gray">Phone Number</label>
                            <input type="tel" v-model="contactEditData.phoneNumber" class="rounded-px5 border border-grey-ce py-px5 px-2.5 text-xs lg:text-sm xl:text-base 2xl:text-lg font-bold outline-none text-grey-ed">
                            <p v-if="v$.contactEditData.phoneNumber.$error" class="text-px8 text-lightred min-w-max">{{ v$.contactEditData.phoneNumber.$errors[0].$message }}</p>
                        </div>
                    </div>
                    <div class="border-t border-grey-disable py-2.5 w-full mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 flex items-center">
                        <button type="submit" @click="contactEdit" class="bg-lightgreen rounded-px5 px-4 lg:px-5 xl:px-6 2xl:px-7 py-px5 lg:py-2 text-px10 text-white mx-auto">Save Contact</button>
                    </div>
                </form>
            </div>
		</transition>
	</div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
export default {
	name: 'ContactAddNew',
    props: ['profileImage', 'profileName', 'profileEmail', 'profileBio', 'profilePhone', 'profileId'],
    data() {
        return {
            v$: useValidate(),
            contactEditData: {
                contactName: this.profileName,
                email: this.profileEmail,
                phoneNumber: this.profilePhone
            }
        };
    },
    validations() {
        return {
            contactEditData: {
                contactName: {  },
                email: {
                    required, 
                    email
                },
                phoneNumber: { numeric }
            }
        }
    },
    methods: {
        contactEdit: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
				console.log('Contact Name:'+this.contactEditData.contactName);
				console.log('Email *:'+this.contactEditData.contactName);
				console.log('Phone Number:'+this.contactEditData.contactName);
            }
        },
    }
}
</script>
<style>
</style>