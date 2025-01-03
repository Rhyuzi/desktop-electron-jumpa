<template>
  <div class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
            <join-meeting-card />
        </transition>
  </div>
</template>

<script>
import JoinMeetingCard from './JoinMeetingCard.vue'
export default {
  components: { JoinMeetingCard },
    name: 'ConfirmPopup',
}
</script>

<style>

</style>