<template>
  <NavbarComponent></NavbarComponent>
  <div class="favorite__wrapper mx-auto container">
    <div class="page__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500">Favorite items</h2>
      <div v-if="likedProduct.length > 0" class="brand__cards">{{ likedProduct.length }} items</div>
      <div v-else-if="likedProduct.length < 1" class="brand__cards">You don’t have any favorite item yet</div>
    </div>
    <hr />
    <div v-if="isLookingForProducts" class="d-flex align-items-center justify-content-center">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else-if="!isLookingForProducts && likedProduct.length > 0" class="products__wrapper row gx-4 gy-5">
      <ProductCard v-for="product in likedProduct" :product="product"></ProductCard>
    </div>
    <product-not-found
      v-else-if="!isLookingForProducts && likedProduct.length < 1"
      image-link="/images/folder-favorite.png"
      pop-message="No favorite items yet"
      sub-message="When add item to favorite, the item will appear on the favorite list."
    >
      <router-link to="/collection" class="btn btn-primary" style="width: 234px">Find Products</router-link>
    </product-not-found>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import LoadingSpinner from "../components/Loading/LoadingSpinner.vue";
import NavbarComponent from "../components/Navbar/NavbarComponent.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import ProductNotFound from "../components/Products/ProductNotFound.vue";
import { useProductStore } from "../stores/product";
import { computed, onMounted, ref } from "vue";
const productStore = useProductStore();
const isLookingForProducts = ref(false);
onMounted(async () => {
  isLookingForProducts.value = true;
  await productStore.findAllProducts();
  isLookingForProducts.value = false;
});
const likedProduct = computed(() => {
  return productStore.getFavoriteProduct;
});
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
