<template>
	<confirm-popup
		v-if="popupDelete"
		@close="popupDelete = false"
		@function=deleteRecording(currentSerial)
		buttonTitle="Delete"
		popupMessage="Are you sure you want to delete this files? You cannot restore it once deleted."
		popupTitle="Delete files">
	</confirm-popup>
	<notification-toast
		v-if="toastActive"
		notifMessage="Deleted Successfully!"
		:notifType=0 />
	<div class="default-page">
		<div class="card p-5">
			<h2 class="font-bold text-2xl text-grey-black mb-5">Recording</h2>
			<div class="grid gap-pc375 recording-list pt-0 pr-5 pb-2.5 pl-2.5">
				<h6 class="text-px10 font-bold text-grey-gray">Start Time</h6>
				<h6 class="text-px10 font-bold text-grey-gray">Subject</h6>
				<h6 class="text-px10 font-bold text-grey-gray">Meeting ID</h6>
				<h6 class="text-px10 font-bold text-grey-gray">Files</h6>
				<h6 class="text-px10 font-bold text-grey-gray"></h6>
			</div>
			<div id="listRecording" class="flex flex-col gap-px5 sticky flex-nowrap overflow-hidden overflow-y-auto pr-2.5 h-full hasInactive">
				<transition-group name="slide-up" appear>
					<div class="grid recording-list gap-pc375 items-center rounded-tr-px5 px-2.5 py-px11 border-grey-disable border hover:bg-grey-background focus:bg-grey-background cursor-pointer" v-for="recording in recordings" :key=recording.meetingNum>
						<p class="text-grey-ed text-px10">{{ recording.endDateVal }} {{ recording.endTimeVal }}</p>
						<p class="text-grey-ed text-px10">{{ recording.subject }}</p>
						<p class="text-grey-ed text-px10">{{ recording.meetingNum }}</p>
						<p class="text-grey-ed text-px10">{{ recording.files }}</p>
						<div class="flex gap-px5 justify-end">
							<button @click="console.log('download clicked')" class="bg-gradient-to-b from-white to-grey-f4 border border-grey-disable text-grey-ed text-px10 rounded-px5 px-px9">
								<i class="fas fa-download text-grey-black text-xs lg:text-sm xl:text-base 2xl:text-lg"></i>
							</button>
							<button @click="deleteClicked(recording.meetingNum)" class="bg-lightred text-white text-px10 rounded-px5 px-px9 py-1">
								Delete
							</button>
						</div>
					</div>
				</transition-group>
			</div>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmPopup from '../components/ConfirmPopup.vue'
export default {
  components: { ConfirmPopup },
	data() {
		return {
			popupDelete: false,
			currentSerial: '',
			toastActive: false,
			recordings: [
				{
					meetingNum: 123456,
					endDateVal: '28/09/2021',
					endTimeVal: '15:48',
					subject: 'Meeting Andika',
                    files: '4 (1.19GB)'
				},
				{
					meetingNum: 234567,
					endDateVal: '28/09/2021',
					endTimeVal: '17:05',
					subject: 'Meeting Andika',
                    files: '4 (1.19GB)'
				},
			]
		}
	},
	computed: {
		...mapGetters({
			lists: 'meetings/getLists'
		})
	},
	async created() {
		await this.$store.dispatch('meetings/getLists', {
			pageSize: 20,
      meetingState: 1
		})
	},
  methods: {
		deleteClicked(id) {
			this.currentSerial = id
			this.popupDelete = true
		},
		deleteRecording(serialNumber) {
			this.popupDelete = false
			this.toastActive = true
			setTimeout(() => {
				this.toastActive = false
			}, 2975);
		}
	}
}
</script>

<style>
.recording-list {
    width: 100%;
	grid-template-columns: 13% 35% 9% 9% 13%
}
.active {
	display: flex;
}
.inactive {
	display: none;
}
</style>