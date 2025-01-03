<template>
	<div id="resetPasswodSuccess">
		<success-card
			titleText="Your password has been reset successfully"
			messageText="Please sign in with your new password"
		 />
	</div>
</template>
<script>
import SuccessCard from '../../components/SuccessCard.vue'
export default {
  components: { SuccessCard },
	name: 'ResetPasswordSuccess',
}
</script>