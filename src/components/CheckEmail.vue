<template>
    <div class="bg-white rounded-px5 p-px30 shadow-custom xl:p-10 flex items-center flex-col max-w-md">
        <h2 class="font-bold text-grey-black text-2xl xl:text-3xl text-center mb-2.5">Check Your Email</h2>
        <p class="text-xs xl:text-sm text-grey-black text-center">{{ message }}</p>
        <p class="text-xs xl:text-sm text-grey-black text-center font-bold">{{ param }}</p>
        <img src="img/check-email.png" alt="" class="mx-auto py-px30">
        <p class="text-xs xl:text-sm text-grey-black text-center mb-px30">{{ footerMessage }}</p>
        <button @click="$emit('buttonClicked')" type="button" class="primary-button red-input" :disabled="countDown != 0">RESEND EMAIL {{ timeLeft ? '' : ( countDown == 0 ? '' : '('+countDown+')') }}</button>
        <div class="flex text-xs xl:text-sm text-linkblue mt-5 lg:mt-5 px-2.5 w-full text-center">
            <router-link to='/' class="back-button flex-1">
                <i class="fas fa-chevron-left pr-1"></i> Change Email
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
	name: 'SignUpCheckEmail',
    props: ['message', 'param', 'footerMessage'],
    data() {
        return {
            countDown: 59,
        }
    },
    computed: {
        timeLeft() {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown--
                }, 1000);
            }
        }
    },
}
</script>