<template>
	<NewMeetingPopup v-if="meetingPopup" @close="meetingPopup = false"/>
	<join-meeting-popup v-if="joinPopup" @close="joinPopup = false" />
	<schedule-meeting-popup v-if="scheduleMeeting" @close="scheduleMeeting = false" />
	<schedule-webinar-popup v-if="scheduleWebinar" @close="scheduleWebinar = false" />
	<confirm-popup
		v-if="popupDelete"
		@close="popupDelete = false"
		@function=endMeeting(currentSerial)
		buttonTitle="End"
		popupMessage="Are you sure you would like to end the meeting?"
		popupTitle="End meeting">
	</confirm-popup>
	<copy-meeting
		v-if="copyMeetingPopup"
		@close="copyMeetingPopup = false"
		:dataToCopy=dataToCopy
		:serial=currentSerial
	/>
  <div class="fixed flex flex-col sm:flex-row justify-between w-full">
    <div class="home-ls">
		<transition-group name="slide-left" appear>
			<h3 key="0" class="kanit font-bold text-xl lg:text-2xl xl:text-3xl text-grey-black mt-4 mb-px5 lg:mb-px15 px-4 sm:px-16">Hi, {{ userInfo.displayName }}</h3>
			<p key="1" class="text-px10 lg:text-sm xl:text-base text-grey-gray mb-5 lg:mb-px30 px-4 sm:px-16">{{ userInfo.bio }}</p>
			<div key="2" class="mx-auto bg-white w-max py-px15 px-5 lg:p-px25 border-grey-disable border rounded-px10 flex items-center justify-evenly gap-5 lg:gap-6">
				<div @click="newMeeting" class="flex flex-col items-center gap-2.5 w-max cursor-pointer">
					<div class="bg-maroon rounded-px10 w-16 lg:w-px100 h-16 lg:h-px100 p-px13 lg:p-6 xl:p-7 flex items-center">
						<i class="fas fa-video text-white text-3xl lg:text lg:text-5xl"></i>
					</div>
					<p class="text-px8 xl:text-xs text-center">New Meeting</p>
				</div>
				<div @click="joinPopup = true" class="flex flex-col items-center gap-2.5 w-max cursor-pointer">
					<div class="bg-maroon rounded-px10 w-16 lg:w-px100 h-16 lg:h-px100 p-px13 lg:p-6 xl:p-7 flex items-center">
						<i class="fas fa-sign-in-alt text-white text-3xl lg:text-5xl mx-auto"></i>
					</div>
					<p class="text-px8 xl:text-xs text-center">Join Meeting</p>
				</div>
				<div @click="scheduleClicked = !scheduleClicked" class="flex flex-col items-center gap-2.5 w-max cursor-pointer relative">
					<div class="bg-maroon rounded-px10 w-16 lg:w-px100 h-16 lg:h-px100 p-px13 lg:p-6 xl:p-7 flex items-center">
						<i class="fas fa-calendar-alt text-white text-3xl lg:text-5xl mx-auto"></i>
					</div>
					<p class="text-px8 xl:text-xs text-center">Schedule</p>
					<transition name="slide-left" appear>
						<ul v-if="scheduleClicked" class="bg-grey-black text-white text-sm rounded-px5 py-3 px-px15 absolute md:-right-36 top-16 md:top-4">
							<li @click="scheduleMeeting = true" class="option-list flex gap-2.5 mb-3">
								<i class="fas fa-users"></i>
								<p>Meeting</p>
							</li>
							<li @click="scheduleWebinar = true" class="option-list flex gap-2.5">
								<i class="fas fa-users"></i>
								<p>Webinar</p>
							</li>
						</ul>
					</transition>
				</div>
			</div>
		</transition-group>
    </div>
    <transition name="slide-right" appear>
		<div class="home-rs bg-white border border-grey-disable rounded-t-px10">
			<nav role="navigation" class="w-full bg-grey-disable rounded-t-px10 flex justify-between text-center text-sm xl:text-lg font-bold text-grey-gray">
                <a @click="changeTab('upcomingMeeting')" class="w-1/2 py-5 cursor-pointer" :class="{ 'bg-white text-grey-black rounded-t-px10': currentTab === 'upcomingMeeting'}">Upcoming Meeting</a>
                <a @click="changeTab('scheduleMeeting')" class="w-1/2 py-5 cursor-pointer" :class="{ 'bg-white text-grey-black rounded-t-px10': currentTab === 'scheduleMeeting'}">Scheduled Meeting</a>
            </nav>
			<div v-if="currentTab === 'upcomingMeeting'" class="h-full pt-2.5 lg:pt-px30 px-2.5 md:px-px25 lg:px-px25 xl:px-px45">
				<div id="upcomingList" class="h-full pb-32 grid grid-cols-1 gap-2.5 xl:gap-5 sticky flex-col flex-wrap overflow-hidden overflow-y-auto hasInactive">
					<transition-group name="slide-right" v-if="upcomingMeetings.length > 1" appear>
						<div v-for="upcoming in upcomingMeetings" :key=upcoming.meetingNum class="sch-upc-meeting rounded-px10 bg-maroon text-white p-px15 lg:p-5 relative">
							<div class="flex gap-2.5 lg:gap-px15 items-center text-px8 lg:text-xs">
								<p class="text-white">Meeting ID: {{ upcoming.meetingNum }}</p>
								<p v-if="upcoming.state === 2" class="bg-lightgreen rounded-full py-0.5 lg:py-1 px-4">In Process</p>
								<p v-if="upcoming.state === 0" class="bg-orange rounded-full py-0.5 lg:py-1 px-4">To Be Hosted</p>
							</div>
							<h5 class="mr-px35 mb-px5 lg:mb-2.5 text-sm xl:text-lg font-bold mt-1.5">{{ upcoming.subject }}</h5>
							<div class="mr-px35 mb-2.5 lg:mb-5 flex gap-px15 items-center text-px10 xl:text-xs">
								<p class="">
									<i class="fas fa-clock mr-2.5"></i>
									{{ upcoming.startDateVal }} • {{ upcoming.startTimeVal }} - {{ upcoming.endTimeVal }}</p>
								<p class="">
									<i class="fas fa-user mr-2.5"></i>
									100 </p>
								<p class="">
									<i class="fas fa-mail mr-2.5"></i>
									0 </p>
							</div>
							<button v-if="upcoming.state === 2" class="bg-lightgreen py-2 px-5 rounded-full font-bold">HOST MEETING</button>
							<button v-else class="bg-grey-background border border-grey-gray text-grey-black py-2 px-5 rounded-full font-bold">HOST MEETING</button>
							<div class="absolute top-4 lg:top-5 right-4 lg:right-5">
								<button @click="openToggle(upcoming.meetingSerialNum)" class="w-5 lg:w-px25 h-5 lg:h-px25 rounded-full bg-white">
									<i class="fas fa-ellipsis-h text-grey-black text-xs xl:text-sm"></i>
								</button>
								<div :key=upcoming.meetingSerialNum :id=upcoming.meetingSerialNum class="flex flex-col rounded-px5 shadow-sm bg-white py-2.5 px-px15 absolute top-3 right-3 gap-px5 inactive w-max">
									<p @click="copyMeeting(upcoming.hostEamil, upcoming.hostName, upcoming.meetingNum, upcoming.subject, upcoming.startDateVal, upcoming.startTimeVal, upcoming.meetingSerialNum)" class="dropdown-text">Copy Invitation</p>
									<p @click="popupDelete = true" class="dropdown-text">End Meeting</p>
								</div>
							</div>
						</div>
					</transition-group>
					<transition name="slide-right" appear v-else>
						<div class="text-base text-grey-gray mx-auto my-auto px-4 py-8">No upcoming meetings today</div>
					</transition>
				</div>
			</div>
		</div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmPopup from '../components/ConfirmPopup.vue'
import CopyMeeting from '../components/CopyMeeting.vue'
import JoinMeetingPopup from '../components/JoinMeetingPopup.vue'
import NewMeetingPopup from '../components/NewMeetingPopup.vue'
import ScheduleMeetingPopup from '../components/ScheduleMeetingPopup.vue'
import ScheduleWebinarPopup from '../components/ScheduleWebinarPopup.vue'
export default {
  components: { NewMeetingPopup, JoinMeetingPopup, ConfirmPopup, CopyMeeting, ScheduleMeetingPopup, ScheduleWebinarPopup },
  name: 'Home',
  data(){
    return{
		copyMeetingPopup: false,
		currentSerial: '',
		currentTab: 'upcomingMeeting',
		joinPopup: false,
		meetingPopup: false,
		popupDelete: false,
		scheduleClicked: false,
		scheduleMeeting: false,
		scheduleWebinar: false,
		webinarPopup: false,

		dataToCopy: {
			hostEmail: '',
			hostName: '',
			meetingNum: 0,
			subject: '',
			startDateVal: '',
			startTimeVal: ''
		},

		pageIndex: 1,
		pageSize: 15,
		userInfo: {
			displayName: localStorage.getItem('displayName'),
			bio: localStorage.getItem('bio'),
			email: localStorage.getItem('email')
		}
    }
  },
  computed: {
		...mapGetters({
			upcomingMeetings: 'meetings/getLists',
		})
	},
	async created() {
		await this.$store.dispatch('meetings/getLists', {
			pageSize: this.pageSize,
			meetingState: 0
		})
	},
	methods: {
		openToggle(elId) {
			if (document.getElementById(elId).classList.contains('inactive')) {
				if (document.getElementById("upcomingList").classList.contains('hasInactive')) {
					this.currentSerial = elId
					document.getElementById(elId).classList.remove('inactive')
					document.getElementById(elId).classList.add('active')
					document.getElementById("upcomingList").classList.remove('hasInactive')
					document.getElementById("upcomingList").classList.add('hasActive')
				}
			} else {
				document.getElementById(elId).classList.remove('active')
				document.getElementById(elId).classList.add('inactive')
				document.getElementById("upcomingList").classList.remove('hasActive')
				document.getElementById("upcomingList").classList.add('hasInactive')
			}
		},
		changeTab(newTab) {
			this.currentTab = newTab
		},
		newMeeting() {
		this.meetingPopup = true
		},
		endMeeting(meetingSerialNum) {
			console.log('ENDED', meetingSerialNum);
			location.reload()	
		},
		copyMeeting(email, name, meetId, subject, startDate, startTime, meetingSerialNum) {
			this.dataToCopy.hostEmail = email
			this.dataToCopy.hostName = name
			this.dataToCopy.meetingNum = meetId
			this.dataToCopy.subject = subject
			this.dataToCopy.startDateVal = startDate
			this.dataToCopy.startTimeVal = startTime
			this.copyMeetingPopup = true
		}
	}
}
</script>
<style>
.home-rs {
	min-width: 300px;
	width: 90%;
	height: 100%;
	margin: 0 auto;
}
.home-ls {
	min-width: 340px;
	width: 100%;
	padding: 0 0 25%;
	background: url('/../img/sumpah-pemuda.png') center bottom;
	background-size: contain;
	background-repeat: no-repeat;
}
.hldbtn::before {
	content: '•••';
	color: #424242;
	font-size: .75rem;
	position: absolute;
	bottom: 3.125%;
	right: 20%; }
.sch-upc-meeting {
	background: url('/../img/bg-upc-sch.png') no-repeat center;
	background-size: cover;
}
.active {
	display: flex;
}
.inactive {
	display: none;
}
.dropdown-text, .option-list {
	font-size: 14px;
	line-height: 21px;
	color: #9B9999;
	cursor: pointer;
}
.dropdown-text:hover {
	color: #424242;
	font-weight: 700;
}
.option-list:hover {
	color: white;
	font-weight: 700;
}
@media screen and (min-width: 640px) {
	.home-ls {
		max-width: 45%; 
		max-height: calc(100vh - 62px);
	}
	.home-rs {
		height: calc(100vh - 62px);
		width: calc(55% - 20px);
		margin: 0 25px 0 0;
	}
}
@media screen and (min-width: 1024px) {
	.home-rs {
		margin: 0 50px 0 0;
		min-width: 478;
	}
}
@media screen and (min-width: 1280px) {
	.home-rs {
		margin: 0 100px 0 0;
	}
}
</style>