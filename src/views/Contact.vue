<template>
	<div class="default-page">
		<div class="card p-5">
			<h2 class="font-bold text-2xl text-grey-black mb-5">Contacts</h2>
			<div class="flex gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
				<div class="pt-8 lg:pt-9 xl:pt-10 2xl:pt-11 flex flex-col gap-2.5 max-w-xs">
					<h4 class="font-bold text-px10 text-maroon">My Contacts</h4>
					<h4 class="text-px10 text-grey-black">Business Contact</h4>
					<div class="text-px10 font-bold" v-for="contact in contacts" :key=contact.id>
						<p :class="`pl-${contact.contactGroup.prid*2}`">
							<i v-if="!contact.contactGroup.prid" class="fas fa-caret-down font-bold text-grey-black text-px10 pr-px5"></i>
							<i v-else class="fas fa-caret-right font-bold text-grey-black text-px10 pr-px5"></i>
							{{ contact.contactGroup.gname }}
						</p>
					</div>
				</div>
				<div class="contact-rs flex flex-col flex-1">
					<div class="grid grid-cols-3 items-center w-full justify-between ml-2.5 lg:ml-3 xl:ml-4 2xl:ml-5 pr-2.5 pb-px5">
						<div class="flex items-center gap-px15 cursor-pointer">
							<input type="checkbox" name="participants" id="selectAll" @click="checkedAll">
							<p class="text-px10 text-grey-gray font-bold" id="selectButton" @click="checkedAll">Contact Name &amp; Email</p>
						</div>
						<h4 class="text-px10 text-grey-gray font-bold">Phone Number</h4>
						<button v-if="deleteAllButton" @click="newContactPopup = true" class="bg-lightred text-white text-px10 rounded-px5 flex gap-px5 items-center justify-center px-2.5 py-1 w-max">
							<i class="fas fa-trash text-px10"></i> Delete Contacts
						</button>
						<button v-else @click="newContactPopup = true" class="bg-gradient-to-b from-white to-grey-f4 border border-grey-disable text-grey-ed text-px10 rounded-px5 flex gap-px5 items-center justify-center px-2.5 py-1 lg:py-2 w-max">
							<i class="fas fa-user-plus text-grey-black text-px8"></i> Add Contact
						</button>
					</div>
					<div class="flex flex-col gap-px5 overflow-hidden overflow-y-auto pr-1" id="contactLists">
						<div v-for="contact in contacts" :key=contact.id @dblclick="toDetail(contact.id)" class="relative flex items-center -ml-2.5">
							<input type="checkbox" name="participants" :id=contact.id class="inputParticipant absolute left-5" :value=contact.email>
							<label :for=contact.id class="rounded pl-7 pr-2.5 py-2 border border-grey-disable grid grid-cols-3 justify-between items-center min-w-252 flex-1">
								<div class="flex gap-2.5 flex-nowrap">
									<img :src=contact.img class="w-6 h-6 object-cover rounded-full bg-maroon">
									<div class="text-grey-ed">
										<h5 class="text-px10 font-bold">{{ contact.name }}</h5>
										<p class="text-px8">{{ contact.email }}</p>
									</div>
								</div>
								<p class="text-px10 text-grey-ed">{{ contact.phone }}</p>
								<div class="flex gap-px5">
									<button @click="toEdit(contact.id)" class="bg-gradient-to-b from-white to-grey-f4 border border-grey-disable text-grey-ed text-px10 rounded-px5 px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 lg:py-2 w-max">Edit</button>
									<button @click="confirmDelete(contact.id)" class="bg-lightred text-white text-px10 rounded-px5 px-2.5 py-1 lg:py-2 w-max">Delete</button>
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<contact-add-new v-if="newContactPopup" />
	<contact-edit
		v-if="contactEditPopup"
		:profileBio=currentContactBio
		:profileEmail=currentContactEmail
		:profileId=currentContact
		:profileImage=currentContactImage
		:profileName=currentContactName
		:profilePhone=currentContactPhone />
	<contact-details
		v-if="viewDetail"
		@delete="confirmDelete(currentContact)"
		@edit="toEdit(currentContact)"
		:profileBio=currentContactBio
		:profileEmail=currentContactEmail
		:profileId=currentContact
		:profileImage=currentContactImage
		:profileName=currentContactName
		:profilePhone=currentContactPhone />
	<confirm-popup
		v-if="popupDelete"
		@close="popupDelete = false"
		@function=deleteContact(currentContact)
		buttonTitle="Delete"
		popupTitle="Delete contact"
		:popupMessage="'Are you sure you want to delete '+currentContactName+'?'" />
</template>

<script>
import ConfirmPopup from '../components/ConfirmPopup.vue';
import ContactAddNew from '../components/ContactAddNew.vue'
import ContactDetails from '../components/ContactDetails.vue';
import ContactEdit from '../components/ContactEdit.vue';
export default {
  components: { ContactAddNew, ConfirmPopup, ContactDetails, ContactEdit },
	data() {
		return {
			newContactPopup: false,
			contactEditPopup: false,
			popupDelete: false,
			viewDetail: false,
			deleteAllButton: false,
			message: 'Hola?',

			currentContact: 0,
			currentContactImage: '',
			currentContactName: '',
			currentContactEmail: '',
			currentContactBio: '',
			currentContactPhone: '',

			contacts: [
                {
                    id: 1,
                    contactGroup: {
						gid: 1,
						gname: 'Dinda Jumpa',
						prid: 0,
					},
                    img: 'img/icons/jumpa-logo.png',
                    name: 'Abdul',
                    email: 'abdul@gmail.com',
					phone: '0810-8108-1081'
                },
                {
                    id: 2,
                    contactGroup: {
						gid: 2,
						gname: 'Teman Kampus',
						prid: 1,
					},
                    img: '',
                    name: 'Ghafur',
                    email: 'ghfur@gmail.com',
					phone: '0810-8108-1081'
                },
                {
                    id: 3,
                    contactGroup: {
						gid: 3,
						gname: 'Jurusan Komputer 2021',
						prid: 2,
					},
                    img: '',
                    name: 'Abdul Ghafur',
                    email: 'abdulghfur@gmail.com',
					phone: '0810-8108-1081'
                },
                {
                    id: 4,
                    contactGroup: {
						gid: 4,
						gname: 'BEM Kampus 2021',
						prid: 2,
					},
                    img: '',
                    name: 'Ghani',
                    email: 'ghani@gmail.com',
					phone: '0810-8108-1081'
                },
                {
                    id: 5,
                    contactGroup: {
						gid: 5,
						gname: 'Keluarga Besar Kakek...',
						prid: 1,
					},
                    img: '',
                    name: 'Abdul Ghani',
                    email: 'abdulghani@gmail.com',
					phone: '0810-8108-1081'
                },
                {
                    id: 6,
                    contactGroup: {
						gid: 6,
						gname: 'Geng Kapak SDN 3 Pagi',
						prid: 1,
					},
                    img: '',
                    name: 'Abdullah',
                    email: 'abdullah@gmail.com',
					phone: '0810-8108-1081'
                },
                {
                    id: 7,
                    contactGroup: {
						gid: 7,
						gname: 'Karyawan Jumpa',
						prid: 1,
					},
                    img: '',
                    name: 'Bambang',
                    email: 'bambang@gmail.com',
					phone: '0810-8108-1081'
                },
            ],
		}
	},
	methods: {
        checkedAll() {
            let allParticipants = document.querySelectorAll('.inputParticipant')
            for (let pi = 0; pi < allParticipants.length; pi++) {
				if (allParticipants[pi].checked == true) {
					allParticipants[pi].checked = false
				} else {
					allParticipants[pi].checked = true
				}
            }
			if (document.getElementById('selectAll').checked == true) {
				document.getElementById('selectAll').checked = false
				this.deleteAllButton = false
			} else {
				document.getElementById('selectAll').checked = true
				this.deleteAllButton = true
			}
        },
		confirmDelete(id) {
			this.currentContact = id
			this.contacts.forEach(element => {
				if (element.id == id) {
					this.currentContactName = element.name
				}
			});
			if (this.viewDetail) {
				this.viewDetail = false
			}
			this.popupDelete = true
		},
		toDetail(id) {
			this.currentContact = id
			this.contacts.forEach(element => {
				if (element.id == id) {
					this.currentContactImage = element.img
					this.currentContactName = element.name
					this.currentContactEmail = element.email
					this.currentContactBio = 'IT Analyst, Novelist, Photographer, and also a Cat lover'
					this.currentContactPhone = element.phone
				}
			});
			this.viewDetail = true
		},
		toEdit(id) {
			this.currentContact = id
			this.contacts.forEach(element => {
				if (element.id == id) {
					this.currentContactImage = element.img
					this.currentContactName = element.name
					this.currentContactEmail = element.email
					this.currentContactBio = 'IT Analyst, Novelist, Photographer, and also a Cat lover'
					this.currentContactPhone = element.phone
				}
			});
			if (this.viewDetail) {
				this.viewDetail = false
			}
			this.contactEditPopup = true
		},
		deleteContact(id) {
			console.log('contact '+id+' deleted');
		}
	}
}
</script>

<style>
.contact-rs {
	height: calc(100vh - 138px);
}
input[type=checkbox]:checked + label {
	background-color: #F2F3F5;
}
input[type=radio]:checked + label {
	background-color: #790F19;
	color: white;
}
</style>