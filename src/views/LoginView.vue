<template>
  <simple-navbar></simple-navbar>
  <div class="container mx-auto d-flex justify-content-center align-items-center" style="min-height: 100vh">
    <LoginCard></LoginCard>
  </div>
</template>

<script setup>
import SimpleNavbar from "../components/Navbar/SimpleNavbar.vue";
import LoginCard from "../components/Auth/LoginCard.vue";
</script>
