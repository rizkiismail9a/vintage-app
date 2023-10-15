<template>
  <simpleNavbar></simpleNavbar>
  <div class="container mx-auto d-flex justify-content-center align-items-center" style="min-height: 100vh">
    <regCard></regCard>
  </div>
</template>

<script setup>
import simpleNavbar from "../components/Navbar/simpleNavbar.vue";
import regCard from "../components/auth/regCard.vue";
</script>
