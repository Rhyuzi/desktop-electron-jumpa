<template>
	<div id="signUpCheckEmail">
        <check-email
            @buttonClicked=resendEmail
            :param=email
            footerMessage="Click the activation link we emailed you"
            message="We sent you an activation link to"
        />
	</div>
</template>
<script>
import CheckEmail from '../../components/CheckEmail.vue';
export default {
  components: { CheckEmail },
	name: 'SignUpCheckEmail',
    data() {
        return {
            email: '',
            displayName: ''
        }
    },
    created() {
        this.email = this.$route.params.email
        this.displayName = this.$route.params.displayName
    },
    methods: {
        resendEmail() {
            // this.$router.push({name: 'SetupAccount', params: {email: this.email, displayName: this.displayName}})
            location.reload()
        }
    }
}
</script>