<template>
  <div class="banner position-relative">
    <img src="../../assets/images/header.png" alt="person shopping" class="w-100 object-fit-cover" />
    <selling-card></selling-card>
  </div>
</template>

<script setup>
import SellingCard from "./SellingCard.vue";
</script>

<style scoped>
.banner {
  margin-top: 64px;
}
@media screen and (max-width: 768px) {
  .banner {
    margin-top: 120px;
  }
}
</style>
