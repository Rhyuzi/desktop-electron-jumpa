<template>
  <div class="fixed top-0 left-0 h-1/6 lg:h-1/5 xl:h-1/4 2xl:h-1/3 w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
            <div :id=serial class="bg-grey-black flex items-center text-white rounded-px5 gap-3 py-3 lg:py-4 xl:py-5 2xl:py-6 px-4 lg:px-5 xl:px-6 2xl:px-7">
                <div class="w-7 lg:w-8 xl:w-9 2xl:w-10 h-7 lg:h-8 xl:h-9 2xl:h-10 flex items-center rounded-full max-h-min" :class="{'bg-lightgreen': notifType === 0, 'bg-orange': notifType === 1, 'bg-lightred': notifType === 2}">
                    <i v-if="notifType === 0" class="fas fa-check text-white mx-auto text-base lg:text-xl xl:text-2xl"></i>
                    <i v-if="notifType === 1" class="fas fa-exclamation text-black mx-auto text-base lg:text-xl xl:text-2xl"></i>
                    <i v-if="notifType === 2" class="fas fa-times text-white mx-auto text-base lg:text-xl xl:text-2xl"></i>
                </div>
                <p class="font-bold text-xs lg:text-sm xl:text-base 2xl:text-lg">{{ notifMessage }}</p>
            </div>
        </transition>
  </div>
</template>

<script>
export default {
    name: 'NotificationToast',
    props: [ 'notifType', 'notifMessage', 'serial' ]
}
</script>

<style>

</style>