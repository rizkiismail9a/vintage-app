<template>
  <NavbarComponent :is-at-collection="true" @search="search"></NavbarComponent>
  <div class="collection__container container mx-auto">
    <div class="products__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500" style="font-size: 24px">Items</h2>
      <div class="brand__cards" v-if="keyCard">{{ keyCard }}<img src="../assets/images/close.png" width="20" @click="keyCard = ''" /></div>
    </div>
    <hr />
    <div class="products__wrapper row gx-4 gy-5">
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
      <productCard></productCard>
    </div>
  </div>
  <footerComponent></footerComponent>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarComponent from "../components/Navbar/NavbarComponent.vue";
import productCard from "../components/products/productCard.vue";
import footerComponent from "../components/Footer/footerComponent.vue";
const keyCard = ref("");
const router = useRouter();
function search(keyword) {
  keyCard.value = keyword;
}
</script>

<style scoped>
.collection__container {
  margin-top: 88px;
  margin-bottom: 20px;
}
.products__wrapper {
  margin: 24px 0 72px 0;
}
.brand__cards {
  width: fit-content;
  height: 32px;
  border: 1px solid #e0e0e0;
  padding: 2px 4px 2px 8px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  color: #404040;
}
@media screen and (max-width: 768px) {
  .collection__container {
    margin-top: 120px;
  }
}
</style>
