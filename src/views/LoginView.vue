<template>
  <simpleNavbar></simpleNavbar>
  <div class="container mx-auto d-flex justify-content-center align-items-center" style="min-height: 100vh">
    <loginCard></loginCard>
  </div>
</template>

<script setup>
import simpleNavbar from "../components/Navbar/simpleNavbar.vue";
import loginCard from "../components/auth/loginCard.vue";
</script>
