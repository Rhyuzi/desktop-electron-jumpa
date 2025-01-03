<template>
  <transition name="slide-down" appear>
    <nav class="flex w-full justify-between items-center py-px15 xl:py-px30 px-5 xl:px-px50 gap-5 sm:gap-16 xl:gap-28">
      <div class="flex items-center gap-4 sm:gap-5 xl:gap-9 w-9/12 sm:w-4/12 xl:w-2/5">
        <img :src=logoJumpa alt="Logo Jumpa" class="h-8 xl:h-px38">
        <form class="bg-grey-disable rounded-full flex items-center py-px5 xl:py-2 px-2.5 xl:px-px15 text-px8 xl:text-sm text-grey-lightjumpa flex-1">
          <i class="fas fa-search text-sm"></i>
          <input type="search" name="" id="" placeholder="Find something here..." class="outline-none pl-2.5 xl:pl-px15 bg-transparent w-full">
        </form>
      </div>
      <ul class="hidden sm:flex gap-10 xl:gap-15 font-normal text-px10 xl:text-sm">
        <router-link to="/home" class="menu-list" @click="changeMenu('home')" :class="{ activeMenu: currentMenu === 'home'}">Home</router-link>
        <router-link to="/history" class="menu-list" @click="changeMenu('history')" :class="{ activeMenu: currentMenu === 'history'}">History</router-link>
        <router-link to="/recordings" class="menu-list" @click="changeMenu('recordings')" :class="{ activeMenu: currentMenu === 'recordings'}">Recording</router-link>
        <router-link to="/contact" class="menu-list" @click="changeMenu('contacts')" :class="{ activeMenu: currentMenu === 'contacts'}">Contacts</router-link>
      </ul>
      <div class="flex gap-2.5 xl:gap-6">
        <button @click="signOut" type="button">
          <i class="fas fa-cog text-grey-black text-xs xl:text-xl"></i>
        </button>
        <router-link to="/profile">
          <img src="img/icons/jumpa-logo.png" alt="" class="rounded-full w-px22 xl:w-px38 h-px22 xl:h-px38 bg-white object-cover">
        </router-link>
      </div>
    </nav>
  </transition>
</template>

<script>
import jumpaLogo from '../assets/images/jumpa.png'
export default {
  name: 'NavigationBar',
  data() {
    return {
      currentMenu: '',
      logoJumpa: jumpaLogo
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut')
    },
    changeMenu(newMenu) {
        this.currentMenu = newMenu
    }
  }
}
</script>
<style>
.menu-list:hover, .menu-list:active, .menu-list.activeMenu {
  font-weight: 700;
}
</style>