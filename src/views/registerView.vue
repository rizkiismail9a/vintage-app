<template>
  <simple-navbar></simple-navbar>
  <div class="container mx-auto d-flex justify-content-center align-items-center" style="min-height: 100vh">
    <RegCard></RegCard>
  </div>
</template>

<script setup>
import SimpleNavbar from "../components/Navbar/SimpleNavbar.vue";
import RegCard from "../components/Auth/RegCard.vue";
</script>
