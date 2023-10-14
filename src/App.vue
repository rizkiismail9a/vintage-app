<template>
  <NavbarComponent />
  <router-view />
  <footerComponent></footerComponent>
</template>
<script setup>
import NavbarComponent from "./components/Navbar/NavbarComponent.vue";
import footerComponent from "./components/Footer/footerComponent.vue";
</script>
