<template>
  <base-modal-one v-if="showModal" :image-link="'src/assets/images/regModal.png'" :modal-msg="'Successfully Register'" :sub-modal-msg="'Thank you for register at vintage. Start find your favorite pre-loved product here.'">
    <router-link to="/" class="btn btn-primary w-100">Go to Home Page</router-link>
  </base-modal-one>
  <simple-navbar></simple-navbar>
  <div class="container mx-auto d-flex justify-content-center align-items-center" style="min-height: 100vh">
    <RegCard @register="signup"></RegCard>
  </div>
</template>

<script setup>
import SimpleNavbar from "../components/Navbar/SimpleNavbar.vue";
import RegCard from "../components/Auth/RegCard.vue";
import BaseModalOne from "../components/Modal/BaseModalOne.vue";
import { ref } from "vue";
const showModal = ref(false);
async function signup() {
  showModal.value = true;
}
</script>
