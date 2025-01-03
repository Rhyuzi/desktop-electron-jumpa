<template>
	<div id="scheduleWebinar" class="overlay-bg fixed top-0 left-0 h-screen w-screen z-50 flex flex-col items-center justify-center">
		<transition name="slide-down" appear>
			<div class="bg-white fixed max-h-90 max-w-screen-md w-11/12 md:w-7/12 rounded-px5 shadow-custom p-5 xl:p-px35 flex flex-col gap-2.5 xl:gap-px25">
				<div class="">
					<h2 class="text-grey-black font-bold text-2xl xl:text-3xl">
						{{ !emailSettings && !invitePopup ? 'Schedule Webinar' : '' }}
						{{ invitePopup ? 'Invite Participant' : '' }}
						{{ emailSettings ? 'Email Setting' : '' }}
					</h2>
				</div>
				<form @submit.prevent="newWebinar" class="overflow-hidden overflow-y-auto pr-1 -mr-2">
					<div v-if="!emailSettings && !invitePopup" class="flex flex-col gap-2.5">
                        <!-- MEETING PLAN -->
						<div class="flex flex-col gap-2.5">
							<label class="text-px8 xl:text-xs">Choose your meeting plan</label>
							<div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
								<div class="flex items-center -ml-2">
									<input type="radio" name="meetingPlan" id="platinum" class="absolute left-8">
									<label for="platinum" @click="updatePlans('platinum', 3000)" class="meet-plan flex items-center gap-2.5 pl-12 py-4 border border-grey-lightjumpa rounded w-full">
										<div class="">
											<h6 class="text-px10 xl:text-sm font-bold">Platinum</h6>
											<p class="text-px8 xl:text-xs">Up to 3000 Participants</p>
										</div>
									</label>
								</div>
								<div class="flex items-center -ml-2">
									<input type="radio" name="meetingPlan" id="gold" class="absolute left-8">
									<label for="gold" @click="updatePlans('gold', 2000)" class="meet-plan flex items-center gap-2.5 pl-12 py-4 border border-grey-lightjumpa rounded w-full">
										<div class="">
											<h6 class="text-px10 xl:text-sm font-bold">Gold</h6>
											<p class="text-px8 xl:text-xs">Up to 2000 Participants</p>
										</div>
									</label>
								</div>
								<div class="flex items-center -ml-2">
									<input type="radio" name="meetingPlan" id="silver" class="absolute left-8">
									<label for="silver" @click="updatePlans('silver', 1500)" class="meet-plan flex items-center gap-2.5 pl-12 py-4 border border-grey-lightjumpa rounded w-full">
										<div class="">
											<h6 class="text-px10 xl:text-sm font-bold">Silver</h6>
											<p class="text-px8 xl:text-xs">Up to 1500 Participants</p>
										</div>
									</label>
								</div>
								<div class="flex items-center -ml-2">
									<input type="radio" name="meetingPlan" id="business" class="absolute left-8">
									<label for="business" @click="updatePlans('business', 750)" class="meet-plan flex items-center gap-2.5 pl-12 py-4 border border-grey-lightjumpa rounded w-full">
										<div class="">
											<h6 class="text-px10 xl:text-sm font-bold">Business</h6>
											<p class="text-px8 xl:text-xs">Up to 750 Participants</p>
										</div>
									</label>
								</div>
								<div class="flex items-center -ml-2">
									<input type="radio" name="meetingPlan" id="pro" class="absolute left-8">
									<label for="pro" @click="updatePlans('pro', 500)" class="meet-plan flex items-center gap-2.5 pl-12 py-4 border border-grey-lightjumpa rounded w-full">
										<div class="">
											<h6 class="text-px10 xl:text-sm font-bold">Pro</h6>
											<p class="text-px8 xl:text-xs">Up to 500 Participants</p>
										</div>
									</label>
								</div>
								<div class="flex items-center -ml-2">
									<input type="radio" name="meetingPlan" id="basic" class="absolute left-8">
									<label for="basic" @click="updatePlans('basic', 300)" class="meet-plan flex items-center gap-2.5 pl-12 py-4 border border-grey-lightjumpa rounded w-full">
										<div class="">
											<h6 class="text-px10 xl:text-sm font-bold">Basic</h6>
											<p class="text-px8 xl:text-xs">Up to 300 Participants</p>
										</div>
									</label>
								</div>
							</div>
						</div>
                        <!-- SUBJECT -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Subject</label>
							<div class="flex items-center justify-between gap-2.5">
								<input type="text" v-model="scheduleWebinarData.subject" class="border border-grey-ce py-px5 xl:py-px9 px-2.5 xl:px-px15 text-px10 xl:text-sm outline-none rounded w-full" placeholder="Enter your meeting subject">
								<p v-if="v$.scheduleWebinarData.subject.$error" class="text-px8 xl:text-px10 text-lightred min-w-max">{{ v$.scheduleWebinarData.subject.$errors[0].$message }}</p>
								<p v-else class="text-px8 xl:text-px10 text-grey-ao min-w-max">1-80 characters</p>
							</div>
						</div>
                        <!-- ORGANIZER -->
						<div class="flex flex-col gap-px5 w-full">
							<label class="text-px8 xl:text-xs text-grey-black">Organizer</label>
							<div class="flex gap-2.5">
								<div class="flex flex-1 flex-col gap-1">
									<input type="text" v-model="scheduleWebinarData.organizer" class="border border-grey-ce py-px5 xl:py-px9 px-2.5 xl:px-px15 text-px10 xl:text-sm outline-none rounded" placeholder="Enter name">
									<p v-if="v$.scheduleWebinarData.organizer.$error" class="text-px8 xl:text-px10 text-red">{{ v$.scheduleWebinarData.organizer.$errors[0].$message }}</p>
								</div>
								<div class="flex flex-1 flex-col gap-1">
									<input type="email" v-model="scheduleWebinarData.orgEmail" class="border border-grey-ce py-px5 xl:py-px9 px-2.5 xl:px-px15 text-px10 xl:text-sm outline-none rounded" placeholder="Enter email address">
									<p v-if="v$.scheduleWebinarData.orgEmail.$error" class="text-px8 xl:text-px10 text-red">{{ v$.scheduleWebinarData.orgEmail.$errors[0].$message }}</p>
								</div>
							</div>
						</div>
                        <!-- <input type="datetime" name="" id=""> -->
                        <!-- <input type="datetime-local" name="" id=""> -->
                        <!-- TIMEZONE -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Time Zone</label>
							<div class="custom-select flex items-center justify-between text-px10 xl:text-sm text-grey-black" placeholder="Timezone">
								<select v-model="timeZone">
									<option v-for="tz in timeZones" :key=tz :value=tz.timezone>{{ tz.timezone }}</option>
								</select>
							</div>
						</div>
                        <!-- DURATION -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Duration</label>
							<div class="flex gap-2.5">
								<div class="rounded border border-grey-ce py-px5 px-2.5 xl:py-px9 w-max flex items-center gap-4">
									<button @click="inputDecrease('durationHour')" class="rounded-full bg-grey-disable h-px11 w-px11 relative">
										<i class="fas fa-minus text-px8 text-grey-black px-1 lg:px-2 xl:px-3 2xl:px-4 absolute top-0 input-number-icon"></i>
									</button>
									<div class="flex gap-0.5 items-center">
										<input type="number" v-model="scheduleWebinarData.durHr" min="0" max="6" id="durationHour" class="outline-none text-px10 xl:text-sm w-max text-center">
										<p class="text-px8 text-grey-ao">hr</p>
									</div>
									<button @click="inputIncrease('durationHour', 6)" class="rounded-full bg-grey-disable h-px11 w-px11 relative">
										<i class="fas fa-plus text-px8 text-grey-black px-1 lg:px-2 xl:px-3 2xl:px-4 absolute top-0 input-number-icon"></i>
									</button>
								</div>
								<div class="rounded border border-grey-ce py-px5 px-2.5 xl:py-px9 w-max flex items-center gap-4">
									<button @click="inputDecrease('durationMinute')" class="rounded-full bg-grey-disable h-px11 w-px11 relative">
										<i class="fas fa-minus text-px8 text-grey-black px-1 lg:px-2 xl:px-3 2xl:px-4 absolute top-0 input-number-icon"></i>
									</button>
									<div class="flex gap-0.5 items-center">
										<input type="number" v-model="scheduleWebinarData.durMn" min="0" max="60" id="durationMinute" class="outline-none text-px10 xl:text-sm w-max text-center">
										<p class="text-px8 text-grey-ao">min</p>
									</div>
									<button @click="inputIncrease('durationMinute', 60)" class="rounded-full bg-grey-disable h-px11 w-px11 relative">
										<i class="fas fa-plus text-px8 xl:text-px10 text-grey-black px-1 lg:px-2 xl:px-3 2xl:px-4 absolute top-0 input-number-icon"></i>
									</button>
								</div>
							</div>
						</div>
                        <!-- PASSWORD -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Password</label>
							<div class="flex w-full justify-between items-center gap-2.5">
								<div class="flex gap-0 border border-grey-ce rounded w-full">
									<input v-if="showPassword" type="text" v-model="scheduleWebinarData.password" class="py-px5 xl:py-px9 pl-2.5 xl:pl-px15 text-px10 xl:text-sm outline-none w-full" placeholder="Enter meeting password">
									<input v-else type="password" v-model="scheduleWebinarData.password" class="py-px5 xl:py-px9 pl-2.5 xl:pl-px15 text-px10 xl:text-sm outline-none w-full" placeholder="Enter meeting password">
									<button @click.left="visiblePassword" class="pr-2.5">
										<i v-if="showPassword" class="fas fa-eye text-grey-black text-xs"></i>
										<i v-else class="fas fa-eye-slash text-grey-black text-xs"></i>
									</button>
								</div>
								<p v-if="v$.scheduleWebinarData.password.$error" class="text-px8 xl:text-px10 text-lightred min-w-max">{{ v$.scheduleWebinarData.password.$errors[0].$message }}</p>
								<p v-else class="text-px8 xl:text-px10 text-grey-ao min-w-max">0-8 digits</p>
							</div>
						</div>
                        <!-- DESCRIPTION -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Description</label>
							<div class="flex items-center justify-between gap-2.5">
								<input type="text" v-model="scheduleWebinarData.description" class="border border-grey-ce py-px5 xl:py-px9 px-2.5 xl:px-px15 text-px10 xl:text-sm outline-none rounded w-full" placeholder="Enter your meeting description">
								<p v-if="v$.scheduleWebinarData.description.$error" class="text-px8 xl:text-px10 text-lightred min-w-max">{{ v$.scheduleWebinarData.description.$errors[0].$message }}</p>
								<p v-else class="text-px8 xl:text-px10 text-grey-ao min-w-max">0-500 characters</p>
							</div>
						</div>
                        <!-- AGENDA -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Agenda</label>
							<div class="flex items-center justify-between gap-2.5">
								<input type="text" v-model="scheduleWebinarData.agenda" class="border border-grey-ce py-px5 xl:py-px9 px-2.5 xl:px-px15 text-px10 xl:text-sm outline-none rounded w-full" placeholder="Enter your meeting agenda">
								<p v-if="v$.scheduleWebinarData.agenda.$error" class="text-px8 xl:text-px10 text-lightred min-w-max">{{ v$.scheduleWebinarData.agenda.$errors[0].$message }}</p>
								<p v-else class="text-px8 xl:text-px10 text-grey-ao min-w-max">0-500 characters</p>
							</div>
						</div>
                        <!-- MEETING SETTING -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Webinar Settings</label>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="record" v-model="scheduleWebinarData.record" class="">
								<label for="record" class="text-px10 xl:text-sm text-grey-ed">Automatic Recording</label>
							</div>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="locked" v-model="scheduleWebinarData.locked" class="">
								<label for="locked" class="text-px10 xl:text-sm text-grey-ed">Webinar Locked</label>
							</div>
						</div>
                        <!-- ATTENDEE CONTROL -->
						<div class="flex flex-col gap-px5">
							<label class="text-px8 xl:text-xs text-grey-black">Atendees Control</label>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="muted" v-model="scheduleWebinarData.muted" class="">
								<label for="muted" class="text-px10 xl:text-sm text-grey-ed">Muted by Host on Entry</label>
							</div>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="attendList" v-model="scheduleWebinarData.attendList" class="">
								<label for="attendList" class="text-px10 xl:text-sm text-grey-ed">Display Attendees List/Status</label>
							</div>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="chat" v-model="scheduleWebinarData.chat" class="">
								<label for="chat" class="text-px10 xl:text-sm text-grey-ed">Allow Chat</label>
							</div>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="presentation" v-model="scheduleWebinarData.presentation" class="">
								<label for="presentation" class="text-px10 xl:text-sm text-grey-ed">Disable Presentation</label>
							</div>
							<div class="flex gap-2.5 items-center">
								<input type="checkbox" id="beep" v-model="scheduleWebinarData.beep" class="">
								<label for="beep" class="text-px10 xl:text-sm text-grey-ed">Play Beep When Attendee Joins/Leaves Webinar</label>
							</div>
						</div>
                        <!-- INVITEES -->
						<div class="flex flex-col gap-px5">
							<div class="flex w-full justify-between items-center">
								<label class="text-px8 xl:text-xs text-grey-black">Invitees</label>
								<button @click="invitePopup = true" class="text-maroon text-px10 xl:text-xs font-bold">Add from Contacts</button>
							</div>
							<div class="border border-grey-ce py-px5 px-2.5 xl:p-px15 outline-none rounded flex flex-wrap items-center gap-px5 xl:gap-px15 text-px8 xl:text-xs text-grey-black">
								<div class="border border-grey-disable mb-2.5 py-0.5 px-1 xl:px-2 w-max rounded bg-grey-f8 relative" v-for="(invitee, index) in scheduleWebinarData.invitees" :key=index>
									{{ invitee }}
									<button @click="deleteInvitee(index)" class="bg-grey-black absolute -top-3 -right-2 rounded-full px-1.5 py-px"><i class="fas fa-times text-white"></i></button>
								</div>
								<input type="email" @keyup.enter="addInvitees" @keydown.delete="deleteInvitee(scheduleWebinarData.invitees.length - 1)" id="newInvitee" class="outline-none flex-1 mb-2.5">
							</div>
							<textarea v-model="scheduleWebinarData.invitees" @keyup.enter="addInvitees" class="hidden" placeholder="Separate invitees emails with enter or semicolon key"></textarea>
							<p v-if="v$.scheduleWebinarData.invitees.$error" class="text-px8 xl:text-px10 text-red">{{ v$.scheduleWebinarData.invitees.$errors[0].$message }}</p>
							<p v-else-if="scheduleWebinarData.meetingPlan.participants > 1" class="text-px8 xl:text-px10 text-grey-ao">Invitees are included in the {{ scheduleWebinarData.meetingPlan.participants - (scheduleWebinarData.invitees.length + 1) }} person limit</p>
						</div>
                        <!-- MEETING LAYOUTS -->
						<div class="flex flex-col gap-px5 pb-4">
							<label for="" class="text-px8 xl:text-xs text-grey-black">Webinar Layouts</label>
							<div class="grid grid-cols-3 gap-2.5">
								<div class="flex items-center w-full -ml-2">
									<input type="radio" name="meetingLayouts" id="tile" v-model="scheduleWebinarData.meetingLayouts" class="absolute left-8">
									<label for="tile" class="flex items-center gap-px5 pr-2.5 pl-12 py-px9 border border-grey-disable rounded w-full">
										<div class="flex gap-px5 items-center">
											<img src="img/icons/meeting-layouts/tile-auto.svg">
											<p class="text-px8 xl:text-sm font-bold">Tile (Auto)</p>
										</div>
									</label>
								</div>
								<div class="flex items-center w-full -ml-2">
									<input type="radio" name="meetingLayouts" id="focus" v-model="scheduleWebinarData.meetingLayouts" class="absolute left-8">
									<label for="focus" class="flex items-center gap-px5 pr-2.5 pl-12 py-px9 border border-grey-disable rounded w-full">
										<div class="flex gap-px5 items-center">
											<img src="img/icons/meeting-layouts/tile-auto.svg">
											<p class="text-px8 xl:text-sm font-bold">Focus (1+7)</p>
										</div>
									</label>
								</div>
								<div class="flex items-center w-full -ml-2">
									<input type="radio" name="meetingLayouts" id="speaker" v-model="scheduleWebinarData.meetingLayouts" class="absolute left-8">
									<label for="speaker" class="flex items-center gap-px5 pr-2.5 pl-12 py-px9 border border-grey-disable rounded w-full">
										<div class="flex gap-px5 items-center">
											<img src="img/icons/meeting-layouts/tile-auto.svg">
											<p class="text-px8 xl:text-sm font-bold">Speaker</p>
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div v-if="invitePopup" class="flex w-full gap-6 justify-between">
						<div class="">
							<h5 class="text-maroon font-bold text-px10 pt-5 pb-px15">My Contacts</h5>
							<div class="">
								<div class="" v-for="group in contactGroups" :key=group.name>
									<div class="text-px10 xl:text-sm text-grey-black" :class="{'font-bold': group.child}">{{ group.name }}</div>
									<div class="text-px10 xl:text-sm text-grey-black" v-for="child in group.child" :key=child.name>
										<div class="text-px10 xl:text-sm text-grey-black pl-4">{{ child.name }}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-col gap-2 flex-1">
							<div class="flex items-center gap-5 pl-8 cursor-pointer">
								<input type="checkbox" name="participants" id="selectAll" @click="checkedAll">
								<p class="text-px10 xl:text-sm text-grey-ed" id="selectButton" @click="checkedAll">Select All</p>
							</div>
							<div class="contact-list mr-1 pr-1 flex flex-col flex-nowrap gap-px5">
								<transition-group name="slide-down" appear>
									<div v-for="contact in contacts" :key=contact.id class="relative flex items-center">
										<input type="checkbox" name="participants" :id=contact.id class="inputParticipant absolute left-8" :value=contact.email>
										<label :for=contact.id class="cb-contact rounded pl-12 pr-2.5 py-2 xl:py-4 border border-grey-disable flex gap-2.5 xl:gap-px15 flex-nowrap items-center min-w-252 flex-1">
											<img :src=contact.img class="w-6 xl:w-px35 h-6 xl:h-px35 object-cover rounded-full bg-maroon">
											<div class="text-grey-ed">
												<h5 class="text-px10 xl:text-sm font-bold">{{ contact.name }}</h5>
												<p class="text-px8 xl:text-xs">{{ contact.email }}</p>
											</div>
										</label>
									</div>
								</transition-group>
							</div>
						</div>
					</div>
				</form>
				<div class="flex mt-2.5 justify-between">
					<button @click="emailSettings = true" :class="emailSettings || invitePopup ? 'invisible' : 'visible'" class="font-bold text-grey-black text-px10 xl:text-sm">EMAIL SETTINGS</button>
					<div v-if="!emailSettings && !invitePopup" class="flex gap-2.5">
						<button @click="$emit('close')" class="rounded-px5 border border-grey-lightjumpa bg-grey-background text-grey-black font-bold py-1 sm:py-2.5 px-4 sm:px-12 xl:px-px30 text-px10 xl:text-sm">CANCEL</button>
						<button type="submit" @click="newWebinar" class="bg-maroon rounded-px5 font-bold text-px10 xl:text-sm text-white py-1 sm:py-2.5 px-4 sm:px-12 xl:px-px30">SCHEDULE</button>
					</div>
					<div v-if="emailSettings" class="flex gap-2.5">
						<button @click="clearInstantSetting" class="rounded-px5 border border-grey-lightjumpa bg-grey-background text-grey-black font-bold py-1 sm:py-2.5 px-4 sm:px-12 xl:px-px30 text-px10 xl:text-sm">CANCEL</button>
						<button @click="emailSettings = false" class="bg-maroon rounded-px5 font-bold text-px10 xl:text-sm text-white py-1 sm:py-2.5 px-4 sm:px-12 xl:px-px30">SAVE</button>
					</div>
					<div v-if="invitePopup" class="flex gap-2.5">
						<button @click="invitePopup = false" type="reset" class="rounded-px5 border border-grey-lightjumpa bg-grey-background text-grey-black font-bold py-1 sm:py-2.5 px-4 sm:px-12 xl:px-px30 text-px10 xl:text-sm">CANCEL</button>
						<button @click="addFromContacts" class="bg-maroon rounded-px5 font-bold text-px10 xl:text-sm text-white py-1 sm:py-2.5 px-4 sm:px-12 xl:px-px30 w-max">ADD PARTICIPANT</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import md5 from 'crypto-js/md5'
import CONFIG from "../js/config";
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength, email } from '@vuelidate/validators'
export default {
	name: 'ScheduleWebinarPopup',
    data() {
        return {
			emailSettings: false,
			showPassword: false,
			invitePopup: false,

            v$: useValidate(),
            scheduleWebinarData: {
                agenda: '',
                attendList: false,
                beep: false,
                chat: false,
                description: '',
                durHr: 0,
                durMn: 0,
                invitees: [],
                locked: false,
                meetingLayouts: '',
                meetingPlan: {
                    participants: 0,
                    name: ''
                },
                muted: false,
                organizer: localStorage.getItem('account'),
                orgEmail: localStorage.getItem('email'),
                password: '',
                subject: '',
                timeZone: '',
                presentation: false,
                record: false,
            },
			
			contactGroups: [
				{
					name: 'Grup 1'
				},
				{
					name: 'Group 2',
					child: [
						{
							name: 'Subgroup 1',
							child: []
						},
						{
							name: 'Subgroup 2',
							child: []
						}
					]
				}
			],
			contacts: [
                {
                    id: 1,
                    contactGroup: [],
                    img: 'img/icons/jumpa-logo.png',
                    name: 'Abdul',
                    email: 'abdul@gmail.com'
                },
                {
                    id: 2,
                    contactGroup: [],
                    img: '',
                    name: 'Ghafur',
                    email: 'ghfur@gmail.com'
                },
                {
                    id: 3,
                    contactGroup: [],
                    img: '',
                    name: 'Abdul Ghafur',
                    email: 'abdulghfur@gmail.com'
                },
                {
                    id: 1,
                    contactGroup: [],
                    img: 'img/icons/jumpa-logo.png',
                    name: 'Abdul',
                    email: 'abdul@gmail.com'
                },
                {
                    id: 2,
                    contactGroup: [],
                    img: '',
                    name: 'Ghafur',
                    email: 'ghfur@gmail.com'
                },
                {
                    id: 3,
                    contactGroup: [],
                    img: '',
                    name: 'Abdul Ghafur',
                    email: 'abdulghfur@gmail.com'
                },
                {
                    id: 1,
                    contactGroup: [],
                    img: 'img/icons/jumpa-logo.png',
                    name: 'Abdul',
                    email: 'abdul@gmail.com'
                },
                {
                    id: 2,
                    contactGroup: [],
                    img: '',
                    name: 'Ghafur',
                    email: 'ghfur@gmail.com'
                },
                {
                    id: 3,
                    contactGroup: [],
                    img: '',
                    name: 'Abdul Ghafur',
                    email: 'abdulghfur@gmail.com'
                },
            ],
        };
    },
    validations() {
        return {
            scheduleWebinarData: {
                agenda: { 
                    maxLength: maxLength(500)
                },
                attendList: {  },
                beep: {  },
                chat: {  },
                description: { 
                    maxLength: maxLength(500)
                },
                durHr: { required },
                durMn: { required },
                invitees: {
                    maxLength: maxLength(this.scheduleWebinarData.meetingPlan.participants),
                },
                locked: {  },
                organizer: { required },
                orgEmail: {
                    required, 
                    email
                },
                password: {
                    maxLength: maxLength(8)
                },
                presentation: {  },
                record: {  },
                subject: { 
                    required,
                    minLength: minLength(1),
                    maxLength: maxLength(80)
                },
                timeZone: {  }
            }
        }
    },
	computed: {
		...mapGetters({
			timeZones: 'profile/getTimezone'
		})
	},
	async created() {
		await this.$store.dispatch('profile/getSystemData', {
			email: localStorage.getItem('email'),
			accessToken: localStorage.getItem('accessToken')
		})
	},
    methods: {
        newWebinar: async function() {
            this.v$.$validate()
            if (!this.v$.$error) {
                const res = await this.$store.dispatch('meetings/meetingQuickStart', {
					subject: this.subject,
					password: md5(this.password),
					inviteInfos: [],

                });
				if (res) {
					window.open(CONFIG.SERVER_DOMAIN + res, '_blank')
				}
            }
        },

		clearInstantSetting(){
			console.log('cleared');
		},
		visiblePassword() {
			this.showPassword = !this.showPassword
		},
		addInvitees() {
			if (document.getElementById("newInvitee").value != '') {
				this.scheduleWebinarData.invitees.push(document.getElementById("newInvitee").value)
			}
			document.getElementById("newInvitee").value = ''
		},
		deleteInvitee(index) {
			if (document.getElementById("newInvitee").value == '') {
				this.scheduleWebinarData.invitees.splice(index, 1)
			}
		},
		inputIncrease(elId, maxValue) {
			let incResult = parseInt(document.getElementById(elId).value, 10)
			incResult = isNaN(incResult) ? 0 : incResult
			if (incResult < maxValue) {
				incResult++
			}
			document.getElementById(elId).value = incResult
		},
		inputDecrease(elId) {
			let incResult = parseInt(document.getElementById(elId).value, 10)
			incResult = isNaN(incResult) ? 0 : incResult
			if (incResult > 0) {
				incResult--
			}
			document.getElementById(elId).value = incResult
		},
		updatePlans(name, participants) {
			this.scheduleWebinarData.meetingPlan.name = name
			this.scheduleWebinarData.meetingPlan.participants = participants
		},

		addFromContacts() {
            let allParticipants = document.querySelectorAll('.inputParticipant')
            for (let pi = 0; pi < allParticipants.length; pi++) {
				if (allParticipants[pi].checked == true) {
					this.invitees.push(allParticipants[pi].value)
					this.invitees = this.invitees.filter((item, pos, self) => self.indexOf(item) == pos)
					this.invitePopup = false
				}
            }
		},
        checkedAll() {
            let allParticipants = document.querySelectorAll('.inputParticipant')
            for (let pi = 0; pi < allParticipants.length; pi++) {
				if (allParticipants[pi].checked == true) {
					allParticipants[pi].checked = false
					document.getElementById('selectButton').textContent = 'Select All'
				} else {
					allParticipants[pi].checked = true
					document.getElementById('selectButton').textContent = 'Deselect All'
				}
            }
        },
    }
}
</script>
<style>
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input[type=checkbox]:checked + label.cb-contact {
	background-color: #F2F3F5;
}
input[type=radio]:checked + label {
	background-color: #790F19;
	color: white;
}
</style>