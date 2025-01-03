<template>
	<confirm-popup
		v-if="popupDelete"
		@close="popupDelete = false"
		@function=deleteHistory(currentSerial)
		buttonTitle="Delete"
		popupMessage="Are you sure you want to delete this history? You cannot restore it once deleted."
		popupTitle="Delete History">
	</confirm-popup>
	<notification-toast
		v-if=toast.active
		:notifMessage=toast.notifMessage
		:notifType=toast.notifType />
	<div class="default-page">
		<div class="card p-5 xl:p-10">
			<h2 class="font-bold text-2xl xl:text-3xl text-grey-black mb-5 xl:mb-px35">Meeting History</h2>
			<div v-if="lists.length > 0" class="grid gap-pc25 history-list pt-0 pb-2.5 sm:px-2.5">
				<h6 class="text-px10 xl:text-sm font-bold text-grey-gray">Date/Time</h6>
				<h6 class="text-px10 xl:text-sm font-bold text-grey-gray">Subject</h6>
				<h6 class="text-px10 xl:text-sm font-bold text-grey-gray">Meeting ID</h6>
				<h6 class="text-px10 xl:text-sm font-bold text-grey-gray">Status</h6>
				<h6 class="text-px10 xl:text-sm font-bold text-grey-gray"></h6>
			</div>
			<div v-if="lists.length > 0" id="listHistory" class="flex flex-col gap-px5 xl:gap-px15 sticky flex-nowrap overflow-hidden overflow-y-auto pr-2.5 hasInactive pb-px5 xl:pb-px15">
				<transition-group name="slide-up" appear>
					<div class="grid history-list gap-pc25 items-center rounded-px5 px-2.5 py-px11 xl:px-px15 border-grey-disable border hover:bg-grey-background focus:bg-grey-background cursor-pointer" v-for="history in lists" :key=history.meetingNum @dblclick="toDetail(history.meetingSerialNum)">
						<p class="text-grey-ed text-px10 xl:text-sm">{{ history.endDateVal }} {{ history.endTimeVal }}</p>
						<p class="text-grey-ed text-px10 xl:text-sm">{{ history.subject }}</p>
						<p class="text-grey-ed text-px10 xl:text-sm">{{ history.meetingNum }}</p>
						<p class="text-grey-ed text-px10 xl:text-sm" :class="{'text-lightred': history.state === -1, 'text-lightgreen': history.state === 3}">{{ history.state === 3 ? 'Ended' : '' }}{{ history.state === -1 ? 'Canceled' : '' }}</p>
						<div class="">
							<button @click="openToggle(history.meetingSerialNum)" class="bg-gradient-to-b w-max from-white to-grey-f4 border border-grey-disable text-grey-ed text-px10 xl:text-sm rounded-px5 flex gap-px15 items-center justify-center px-2">
								Action <i class="fas fa-sort text-grey-black text-px8 xl:text-px10"></i>
							</button>
							<div :key=history.meetingSerialNum :id=history.meetingSerialNum class="flex flex-col rounded-px5 shadow-sm bg-white py-2.5 px-px15 absolute gap-px5 lg:gap-2 inactive">
								<p @click="restartMeeting(history.meetingSerialNum)" class="text-px10 xl:text-sm text-grey-gray cursor-pointer hover:text-grey-ed hover:font-bold">Restart meeting</p>
								<p @click="reschedule(history.meetingSerialNum)" class="text-px10 xl:text-sm text-grey-gray cursor-pointer hover:text-grey-ed hover:font-bold">Reschedule</p>
								<p @click="popupDelete = true" class="text-px10 xl:text-sm text-grey-gray cursor-pointer hover:text-grey-ed hover:font-bold">Delete</p>
							</div>
						</div>
					</div>
				</transition-group>
			</div>
			<div v-if="lists.length > 0" class="flex justify-between items-center w-full py-5 px-0 sm:px-15">
				<div class=""></div>
				<div class="">B</div>
				<div class="flex items-center gap-2.5">
					<p class="text-px10 xl:text-sm font-bold w-full">Show :</p>
					<select class="custom-select">
						<option value="20">20 rows</option>
						<option value="40">40 rows</option>
						<option value="50">50 rows</option>
						<option value="100">100 rows</option>
					</select>
				</div>
			</div>
			<div v-if="lists.length < 1" class="w-full h-4/5 flex flex-col items-center justify-center text-center">
				<i class="fa fa-file text-9xl text-grey-gray mb-px30" aria-hidden="true"></i>
				<h3 class="text-lg text-grey-gray font-bold pb-px5">No meeting history</h3>
				<p class="text-base text-grey-gray">You don’t have any meeting recording</p>
			</div>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmPopup from '../components/ConfirmPopup.vue'
import NotificationToast from '../components/NotificationToast.vue'
export default {
	components: { ConfirmPopup, NotificationToast },
	data() {
		return {
			popupDelete: false,
			currentSerial: '',
			toast: {
				active: false,
				notifMessage: '',
				notifType: 0
			}
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
    openToggle(elId) {
		if (document.getElementById(elId).classList.contains('inactive')) {
			if (document.getElementById("listHistory").classList.contains('hasInactive')) {
				this.currentSerial = elId
				document.getElementById(elId).classList.remove('inactive')
				document.getElementById(elId).classList.add('active')
				document.getElementById("listHistory").classList.remove('hasInactive')
				document.getElementById("listHistory").classList.add('hasActive')
			}
		} else {
			document.getElementById(elId).classList.remove('active')
			document.getElementById(elId).classList.add('inactive')
			document.getElementById("listHistory").classList.remove('hasActive')
			document.getElementById("listHistory").classList.add('hasInactive')
		}
    },
    toDetail(serialNum) {
		this.$router.push({path: `/history-meeting-detail/${serialNum}`})
    },
	restartMeeting(serialNumber) {
		console.warn('Restart Meeting No. '+serialNumber);
	},
	reschedule(serialNumber) {
		console.log('Reschedule Meeting No. '+serialNumber);
	},
	async deleteHistory(meetingSerialNum) {
		const res = await this.$store.dispatch('meetings/meetingDelete', {meetingSerialNum})
		if (res) {
			this.popupDelete = false
			this.toast.active = true
			this.toast.notifMessage = 'Deleted Successfully!'
			this.toast.notifType = 0
			setTimeout(() => {
				location.reload()
				this.toast.active = false
			}, 2975)
		}
	}
  }
}
</script>

<style>
#listHistory {
	height: 76.12%;
}
.history-list {
	grid-template-columns: 14% 37% 10% 10% 19%
}
.active {
	display: flex;
}
.inactive {
	display: none;
}
</style>