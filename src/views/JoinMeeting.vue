<template>
	<div class="join-meeting">
		<join-meeting-card />
	</div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import JoinMeetingCard from '../components/JoinMeetingCard.vue'
export default {
  components: { JoinMeetingCard },
	name: 'JoinMeeting',
}
</script>