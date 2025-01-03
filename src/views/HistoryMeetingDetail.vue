<template>
    <div class="default-page">
        <div class="card m-0">
			<h2 class="font-bold text-2xl xl:text-3xl text-grey-black py-5 px-px30 xl:py-10">Meeting Details</h2>
            <nav role="navigation" class="w-full flex items-center text-center gap-4 sm:gap-px25 xl:gap-15 border-b border-grey-disable px-4 sm:px-px30 xl:px-10 m-0">
                <a @click="changeTab('meetingInfo')" class="tab-menu cursor-pointer" :class="{ active: currentTab === 'meetingInfo'}">Meeting Info</a>
                <a @click="changeTab('participants')" class="tab-menu cursor-pointer" :class="{ active: currentTab === 'participants'}">Participants</a>
                <a @click="changeTab('invitees')" class="tab-menu cursor-pointer" :class="{ active: currentTab === 'invitees'}">Invitees</a>
                <a @click="changeTab('attachments')" class="tab-menu cursor-pointer" :class="{ active: currentTab === 'attachments'}">Attachments</a>
            </nav>
            <div v-if="currentTab === 'meetingInfo'" id="meetingInfo" class="text-px10 xl:text-sm text-grey-ed py-2.5 xl:py-px25 px-4 sm:px-px30 overflow-hidden overflow-y-auto mr-1">
                <table class="text-left table-auto">
                    <tr>
                        <th class="pb-2.5 pr-12">Subject</th>
                        <td>{{ detailData.subject }}</td>
                    </tr>
                    <tr>
                        <th class="pr-12 pb-2.5">Start Time</th>
                        <td>{{ detailData.startTime }}</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Duration</th>
                        <td>{{ detailData.duration }}min</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Meeting ID</th>
                        <td>{{ detailData.meetingNum }}</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12 align-top">Meeting Setting</th>
                        <td class="flex flex-col gap-px5 pb-2.5">
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isAutoRecord === 1" type="checkbox" name="autoRecord" id="autoRecord" checked disabled>
                                <input v-else type="checkbox" name="autoRecord" id="autoRecord" disabled>
                                <label for="autoRecord">Automatic Recording</label>
                            </div>
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isAutoRecord === 1" type="checkbox" name="meetingLocked" id="meetingLocked" checked disabled>
                                <input v-else type="checkbox" name="meetingLocked" id="meetingLocked" disabled>
                                <label for="meetingLocked">Meeting Locked</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12 align-top">Attendee Controls</th>
                        <td class="flex flex-col gap-px5 pb-2.5">
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isMutedWhenJoinRoom === 1" type="checkbox" name="mutedByHost" id="mutedByHost" disabled checked>
                                <input v-else type="checkbox" name="mutedByHost" id="mutedByHost" disabled>
                                <label for="mutedByHost">Muted by Host on Entry</label>
                            </div>
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isEnableViewAttendeeList === '1'" type="checkbox" name="displayAttendees" id="displayAttendees" disabled checked>
                                <input v-else type="checkbox" name="displayAttendees" id="displayAttendees" disabled>
                                <label for="displayAttendees">Display Attendees List/Status</label>
                            </div>
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isEnableChat === 1" type="checkbox" name="allowChat" id="allowChat" disabled checked>
                                <input v-else type="checkbox" name="allowChat" id="allowChat" disabled>
                                <label for="allowChat">Allow Chat</label>
                            </div>
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isDisablePresentation === 1" type="checkbox" name="disablePresentation" id="disablePresentation" disabled checked>
                                <input v-else type="checkbox" name="disablePresentation" id="disablePresentation" disabled>
                                <label for="disablePresentation">Disable Presentation</label>
                            </div>
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isEnableJoinPromptTone === 1" type="checkbox" name="playBeepJoin" id="playBeepJoin" disabled checked>
                                <input v-else type="checkbox" name="playBeepJoin" id="playBeepJoin" disabled>
                                <label for="playBeepJoin">Play Beep When Attendee Joins Meeting</label>
                            </div>
                            <div class="flex gap-px5 items-center">
                                <input v-if="detailData.isEnableLeavePromptTone === 1" type="checkbox" name="playBeepLeave" id="playBeepLeave" disabled checked>
                                <input v-else type="checkbox" name="playBeepLeave" id="playBeepLeave" disabled>
                                <label for="playBeepLeave">Play Beep When Attendee Leaves Meeting</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Plan</th>
                        <td>Platinum</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Organizer</th>
                        <td>{{ detailData.HostName }} ({{ detailData.hostEmail }})</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Host Code</th>
                        <td>{{ detailData.hostCode }}</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Server Location</th>
                        <td>{{ detailData.hostCode_ }}</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Meeting Layout</th>
                        <td>{{ detailData.hostCode_ }}</td>
                    </tr>
                    <tr>
                        <th class="pb-2.5 pr-12">Email Reminder</th>
                        <td>{{ detailData.cycle }}</td>
                    </tr>
                </table>
            </div>
            <div v-if="currentTab === 'participants'" id="participants" class="text-px10 xl:text-sm text-grey-ed px-4 sm:px-px30 overflow-hidden overflow-y-auto mr-1">
                <table class="text-left table-auto w-full">
                    <thead>
                        <tr class="flex items-center justify-between">
                            <th class="pb-1 xl:pb-px15 pt-2.5 xl:pt-px25">Name</th>
                            <th class="pb-1 xl:pb-px15 pt-2.5 xl:pt-px25">Email</th>
                            <th class="pb-1 xl:pb-px15 pt-2.5 xl:pt-px25">Device type</th>
                            <th class="pb-1 xl:pb-px15 pt-2.5 xl:pt-px25">Joined  at</th>
                            <th class="pb-1 xl:pb-px15 pt-2.5 xl:pt-px25">Left at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="participant in participantLists" :key=participant.email class="flex items-center justify-between">
                            <td class="py-2 xl:py-2.5 flex items-center gap-1 sm:gap-px15">
                                <img src="/img/icons/jumpa.png" class="rounded-full bg-grey-black w-px35 object-contain">
                                {{ participant.displayName }}
                            </td>
                            <td class="py-2 xl:py-2.5">{{ participant.email }}</td>
                            <td class="py-2 xl:py-2.5">{{ participant.userAgent }}</td>
                            <td class="py-2 xl:py-2.5">{{ participant.joinTime }}</td>
                            <td class="py-2 xl:py-2.5">{{ participant.leaveTime }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="currentTab === 'invitees'" id="invitees" class="text-px10 xl:text-sm text-grey-ed px-px30 overflow-hidden overflow-y-auto mr-1">
                <table class="text-left table-auto w-full">
                    <thead>
                        <tr class="flex items-center justify-between">
                            <th class="pb-1 xl:pb-px15 pt-2.5 xl:pt-px25">Name</th>
                            <th>Email</th>
                            <th>Joined  at</th>
                            <th>Left at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="flex items-center justify-between" v-for="invitee in inviteeLists" :key=invitee>
                            <td class="py-2 xl:py-2.5 flex items-center gap-px15">
                                <img src="/img/icons/jumpa.png" class="rounded-full bg-grey-black w-px35 object-contain">
                                {{ invitee.displayName }}</td>
                            <td>{{ invitee.email }}</td>
                            <td>{{ invitee.joinTime }}</td>
                            <td>{{ invitee.leaveTime }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="currentTab === 'attachments'" id="attachments" class="text-px10 xl:text-xs text-grey-ed pl-px30 pr-6 py-5 overflow-hidden overflow-y-auto mr-1">
                <div class="grid justify-center gap-1 sm:gap-px13 xl:gap-5 grid-flow-row auto-rows-auto grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                    <div v-for="id in 10" :key=id class="bg-white w-40 xl:w-px188 h-36 xl:h-40 border border-grey-f4 rounded-px5 flex flex-col justify-center items-center gap-2 relative mx-auto">
                        <i class="fas fa-file text-maroon text-5xl xl:text-7xl"></i>
                        <p class="font-bold text-px10 xl:text-xs text-center">
                            Meeting details.pdf<br>
                            <span class="font-normal text-px10">784KB</span>
                        </p>
                        <div class="absolute bg-grey-black rounded-full px-1 top-2.5 right-2.5 cursor-pointer">
                            <i class="fas fa-download text-white text-px8 xl:text-base"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HistoryMeetingDetail',
    data() {
        return {
            currentTab: 'meetingInfo',
            serialNum: this.$route.params.serial,
        }
    },
    computed: {
        ...mapGetters({
            detailData: 'meetings/getMeetingDetails',
            inviteeLists: 'meetings/getInviteeLists',
            participantLists: 'meetings/getParticipantLists',
        })
    },
	async created() {
		await this.$store.dispatch('meetings/meetingDetails', {
			meetingSerialNum: this.serialNum,
		})
        await this.$store.dispatch('meetings/participantLists', {
            meetingSerialNum: this.serialNum,
            token: localStorage.getItem('accessToken')
        })
		await this.$store.dispatch('meetings/inviteeLists', {
            meetingSerialNum: this.serialNum,
            token: localStorage.getItem('accessToken')
		})
	},
    methods: {
        changeTab(newTab) {
            this.currentTab = newTab
        }
    }
}
</script>

<style>
.tab-menu {
    font-size: 10px;
    line-height: 15px;
    color: #9B9999;
    padding: 5px 0;
    border-bottom: 2px solid transparent;
}
.tab-menu:active, .tab-menu:hover, .tab-menu.active {
    font-weight: 700;
    color: #424242;
    border-bottom: 2px solid #790F19;
}
#meetingInfo, #participants, #invitees, #attachments{
    max-height: calc(100vh - 178px);
}
#participants > table, #invitees > table {
    max-width: calc(100vw - 100px);
    height: calc(100vh - 178px);
}
.inactive {
	display: none;
}
@media screen and (min-width: 1280px){
    .tab-menu {
        font-size: 14px;
        line-height: 21px;
        padding: 15px 0;
    }
    .tab-menu:active, .tab-menu:hover, .tab-menu.active {
        border-bottom: 4px solid #790F19;
    }
}
</style>