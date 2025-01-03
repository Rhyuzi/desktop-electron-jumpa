<template>
  <div class="min-w-screen min-h-screen h-full fixed bg-grey-background bg-cover">
    <NavigationBar />
    <div class="m-0">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {
  name: 'BackgroundWhite',
  components: {
    NavigationBar
  }
}
</script>
<style>
.default-page {
  margin: 0;
  padding: 0 20px }
.default-page > .card {
  background-color: white;
  border: 1px solid #e9e9e9;
  border-radius: 10px 10px 0 0;
  height: calc(100vh - 62px);
  width: calc(100vw - 40px);
  position: fixed;
}
</style>