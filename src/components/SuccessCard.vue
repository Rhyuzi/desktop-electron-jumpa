<template>
    <div class="flex flex-col items-center bg-white rounded-px5 p-px30 shadow-custom xl:p-10 max-w-md">
        <h2 class="font-bold text-grey-black text-2xl xl:text-3xl text-center mb-2.5">{{ titleText }}</h2>
        <i class="fas fa-check-circle text-lightgreen mx-auto py-10 text-9xl"></i>
        <p class="text-xs xl:text-sm text-grey-black text-center">{{ messageText }}
            <span class="font-bold">{{ param }}</span>
        </p>
        <p class="text-xs xl:text-sm text-grey-black text-center">{{ message2 }}</p>
        <router-link to="/sign-in">
            <button type="button" class="primary-button red-input mt-px30">SIGN IN</button>
        </router-link>
    </div>
</template>
<script>
export default {
	name: 'ResetPasswordSuccess',
    props: ['messageText', 'message2', 'titleText', 'param']
}
</script>