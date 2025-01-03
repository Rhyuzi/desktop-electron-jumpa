<template>
  <div class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
            <div :id=serial class="bg-white rounded-px5 max-w-md mx-auto py-px15 xl:py-5 border border-grey-disable">
                <div class="px-4 xl:px-10 text-grey-black text-center">
                    <h3 class="kanit text-xl xl:text-2xl font-bold">{{ popupTitle }}</h3>
                    <p class="text-xs xl:text-sm py-2.5 xl:py-5">{{ popupMessage }}</p>
                </div>
                <div class="flex justify-center gap-2.5 xl:gap-px15 items-center border-t border-grey-disable pt-2.5 xl:pt-5">
                    <button @click="$emit('close')" class="bg-grey-background border border-grey-disable text-px10 xl:text-sm text-grey-black rounded-px5 px-4 py-px5">Cancel</button>
                    <button @click="$emit('function')" class="bg-lightred text-white text-px10 xl:text-sm rounded-px5 px-4 py-px5">{{ buttonTitle }}</button>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
export default {
    name: 'ConfirmPopup',
    props: [ 'buttonTitle', 'popupMessage', 'popupTitle', 'serial' ]
}
</script>

<style>

</style>