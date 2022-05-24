<template>
  <Navbar />
  <div class="container">
      <router-view></router-view> 
  </div>
</template>

<script>
import Navbar from '../src/components/Navbar/index.vue';
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
.container{
  margin-top: 30px;
}
</style>
