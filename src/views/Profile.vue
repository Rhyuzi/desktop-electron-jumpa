<template>
	<div class="default-page">
        <div v-if="changePasswordPopup" class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
            <transition name="slide-down" appear>
                <create-new-password />
            </transition>
        </div>
		<div class="card p-px35 xl:p-12">
            <div class="flex flex-nowrap gap-px35 xl:gap-15">
                <div class="h-full relative flex flex-col items-center gap-5 xl:gap-10">
                    <figure class="relative">
                        <img :src="userInfo.image" class="rounded-full w-36 xl:w-48 h-36 xl:h-48 object-contain bg-grey-black">
                    </figure>
                    <div class="relative">
                        <button @click="editPhotoMenu = !editPhotoMenu" class="bg-grey-background border border-grey-disable text-px10 xl:text-sm text-grey-black rounded-px5 px-4 py-px5">
                            <i class="fas fa-camera pr-2"></i>
                            Edit Photo
                        </button>
                        <transition name="slide-left" appear>
                            <div v-if="editPhotoMenu == true" class="flex flex-col rounded-px5 shadow-sm bg-white py-2.5 px-px15 absolute -top-4 left-1/3 gap-px5 lg:gap-2 inactive">
                                <p class="text-px10 xl:text-sm text-grey-gray cursor-pointer hover:text-grey-ed hover:font-bold w-max">Take photo</p>
                                <form @submit.prevent="submitData" name="formGambar" class="flex gap-0">
                                    <input type="file" name="inputImage" id="inputImage" class="hidden h-0">
                                    <label for="inputImage" class="text-px10 xl:text-sm text-grey-gray cursor-pointer hover:text-grey-ed hover:font-bold w-max">Upload photo</label>
                                    <!-- <input type="submit" value="Upload Photo"> -->
                                </form>
                                <p class="text-px10 xl:text-sm text-grey-gray cursor-pointer hover:text-grey-ed hover:font-bold w-max">Remove photo</p>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="border-b border-grey-disable pb-px15">
                        <div class="flex gap-2.5 items-center">
                            <h2 class="kanit font-bold text-grey-black text-2xl xl:text-3xl">{{ userInfo.displayName }}</h2>
                            <div class="bg-lightred rounded py-1 lg:py-2 px-2.5 text-px8 text-white">PLATINUM</div>
                        </div>
                        <p class="text-px10 xl:text-sm text-grey-gray">@{{ userInfo.account }}</p>
                        <p class="text-px10 xl:text-sm text-grey-black py-2.5">{{ userInfo.bio }}</p>
                        <div class="flex gap-px5 items-center">
                            <i class="fas fa-map-marker-alt text-lightred text-xs lg:text-sm xl:text-base 2xl:text-lg"></i>
                            <p class="text-px10 xl:text-sm text-grey-gray">Jakarta, West Java, Indonesia</p>
                        </div>
                    </div>
                    <table class="text-px10 xl:text-sm">
                        <tr>
                            <td colspan="2" class="font-bold text-px10 xl:text-sm text-grey-black kanit pb-2.5 pt-px15">BASIC PROFILE</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">Email</td>
                            <td class="text-grey-black">{{ userInfo.email }}</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">Phone</td>
                            <td class="text-grey-black">0810-0810-8108</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">Date Format</td>
                            <td class="text-grey-black">DD/MM/YYYY</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">First Day of the Week</td>
                            <td class="text-grey-black">Sunday</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">Time</td>
                            <td class="text-grey-black">24-hour time</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">Time Zone</td>
                            <td class="text-grey-black">(GMT+07:00) Jakarta</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="font-bold text-px10 xl:text-sm text-grey-black kanit pt-px15 pb-2.5">Security</td>
                        </tr>
                        <tr>
                            <td class="text-grey-gray pb-px5 pr-12">Password</td>
                            <td @click="changePasswordPopup = true" class="text-grey-black">Change Password</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateNewPassword from './forgotpassword/CreateNewPassword.vue'
export default {
  components: { CreateNewPassword },
    data() {
        return {
            changePasswordPopup: false,
            editPhotoMenu: false,
            userInfo: {
                account: localStorage.getItem('account'),
                bio: localStorage.getItem('bio'),
                displayName: localStorage.getItem('displayName'),
                email: localStorage.getItem('email'),
                // image: localStorage.getItem('photo')
            }
        }
    },
	async created() {
		await this.$store.dispatch('profile/getPicture', {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('accessToken')
        })
	},
    methods: {
        submitData: async function() {
            let uploadInfo = document.forms['formGambar']['inputImage'].files[0]
            await this.$store.dispatch('profile/uploadPicture', {
                email: localStorage.getItem('email'),
                file: uploadInfo,
                token: localStorage.getItem('accessToken')
            });
        },
    }
}
</script>

<style>
</style>