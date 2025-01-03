<template>
	<div id="registration-success">
		<success-card
			titleText="Registration success"
			messageText="Hi, "
            :param=displayName
            message2="Your account has been created"
		 />
	</div>
</template>
<script>
import SuccessCard from '../../components/SuccessCard.vue'
export default {
  components: { SuccessCard },
	name: 'RegistrationSuccess',
    data() {
        return {
            email: '',
            displayName: ''
        }
    },
    created() {
        this.email = this.$route.params.email
        this.displayName = this.$route.params.displayName
    }
}
</script>