<template>
  <div class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
            <div :id=serial class="bg-white rounded-px5 max-w-2xl mx-auto py-px15 xl:py-5 border border-grey-disable">
                <div class="px-4 xl:px-10 text-grey-black text-center">
                    <h3 class="kanit text-xl xl:text-2xl font-bold mb-px35">Copy meeting invitation</h3>
                    <div class="rounded-px5 border border-grey-gray px-px15 mb-2.5 py-2.5 text-left">
                        <p class="text-xs xl:text-sm">
                            Hello, 
                            <br>You have been invited to attend the following meeting:
                            <br>Subject: {{ dataToCopy.subject }}
                            <br>Time: {{ dataToCopy.startDateVal }} {{ dataToCopy.startTimeVal }} WIB
                            <br>Organizer: {{ dataToCopy.hostName }}({{ dataToCopy.hostEmail }})
                            <br>Meeting URL: <span style="overflow-wrap: anywhere">{{ meetingUrl }}</span>
                            <br>Meeting ID: {{ dataToCopy.meetingNum }}
                        </p>
                    </div>
                    <p class="text-xs xl:text-sm text-left text-grey-gray mb-px25">Press Ctrl+c or copy to clipboard</p>
                    <button @click="$emit('close')" class="bg-grey-background border border-grey-disable text-px10 xl:text-sm text-grey-black rounded-px5 px-4 py-px5">Cancel</button>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
export default {
    name: 'CopyMeeting',
    props: [ 'dataToCopy', 'serial' ],
    data() {
        return {
            meetingUrl: `https://dinda.jumpa.id/api/v1.0.0/rtc/dispatch?meetingNum=${this.dataToCopy.meetingNum}&userName=${this.dataToCopy.hostName}&email=${this.dataToCopy.hostEmail}&sn=${this.serial}&isAuto=true`
        }
    }
}
</script>

<style>

</style>