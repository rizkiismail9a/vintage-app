<template>
  <NavbarComponent></NavbarComponent>
  <div class="favorite__wrapper mx-auto container">
    <div class="page__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500">Favorite items</h2>
      <div class="brand__cards">12 items</div>
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
    <product-not-found v-else image-link="/images/folder-favorite.png" pop-message="No favorite items yet" sub-message="When add item to favorite, the item will appear on the favorite list." button-text="Find Products"></product-not-found>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import ProductNotFound from "../components/Products/ProductNotFound.vue";
</script>

<style scoped>
.favorite__wrapper {
  padding-top: 88px;
  margin-bottom: 20px;
  min-height: 100vh;
}
.page__title h2 {
  font-size: 24px;
  line-height: 32px;
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
.products__wrapper {
  margin: 24px 0 72px 0;
}
</style>
