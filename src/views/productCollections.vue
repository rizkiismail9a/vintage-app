<template>
  <NavbarComponent :is-at-collection="true" @search="search"></NavbarComponent>
  <div class="collection__container container mx-auto">
    <div class="page__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500" style="font-size: 24px">{{ $route.query?.brand }} Items</h2>
      <div class="brand__cards" v-if="keyCard">{{ keyCard }}<img src="../assets/images/close.png" width="20" @click="keyCard = ''" /></div>
    </div>
    <hr />
    <div v-if="true" class="products__wrapper row gx-4 gy-5">
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
    <product-not-found v-else image-link="/images/bag-cross.png" pop-message="Product not found" sub-message="We cannot find what you looking for, try to use other keywords or reset keyword." button-text="Reset keyword"></product-not-found>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import ProductNotFound from "../components/Products/ProductNotFound.vue";
const keyCard = ref("");
const router = useRouter();
const result = ref([]);
function search(keyword) {
  keyCard.value = keyword;
}
</script>

<style scoped>
.collection__container {
  margin-top: 88px;
  margin-bottom: 20px;
  min-height: 100vh;
}
.page__title h2 {
  line-height: 32px;
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
.products__404-card {
  width: 343px;
}
@media screen and (max-width: 768px) {
  .collection__container {
    margin-top: 120px;
  }
}
</style>
