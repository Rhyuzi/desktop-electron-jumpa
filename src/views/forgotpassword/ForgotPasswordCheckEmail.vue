<template>
	<div id="forgotPasswordCheckEmail">
        <check-email
            @buttonClicked=resendEmail
            param=""
            footerMessage="Didn't receive the email?"
            message="We just sent you an email with a link to reset your password"
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
        }
    },
    created() {
        this.email = this.$route.params.email
    },
    methods: {
        resendEmail() {
            // this.$router.push({name: 'CreateNewPassword', params: {email: this.email}})
            location.reload()
        }
    }
}
</script>