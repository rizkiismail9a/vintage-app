<template>
  <NavbarComponent :is-at-collection="true" @search="search"></NavbarComponent>
  <div class="collection__container container mx-auto">
    <div class="page__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500" style="font-size: 24px">{{ $route.query?.brand }} Items</h2>
      <div class="brand__cards" v-if="keyCard">
        {{ keyCard
        }}<img
          src="../assets/images/close.png"
          width="20"
          @click="
            keyCard = '';
            bringBackAllProducts();
          "
        />
      </div>
    </div>
    <hr />
    <div v-if="isLoading" class="d-flex h-100 mx-auto p-5 justify-content-center align-items-center">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else-if="!isLoading" class="products__wrapper row gx-4 gy-5">
      <ProductCard v-if="isSearching == false" v-for="item in productsCollection" :product="item"></ProductCard>
      <ProductCard v-else v-for="item in searchResultArr" :product="item"></ProductCard>
    </div>
    <product-not-found v-if="productsCollection.length < 1 && !isLoading" image-link="/images/bag-cross.png" pop-message="Product not found" sub-message="We cannot find what you looking for, try to use other keywords or reset keyword.">
      <button
        v-if="!$route.query.brand"
        class="btn btn-primary"
        style="width: 234px"
        @click="
          bringBackAllProducts();
          keyCard = '';
        "
      >
        Reset Keyword
      </button>
      <router-link to="/" v-else class="btn btn-primary">Back to Home</router-link>
    </product-not-found>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "../components/Loading/LoadingSpinner.vue";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import ProductNotFound from "../components/Products/ProductNotFound.vue";
import { useProductStore } from "../stores/product";
const keyCard = ref("");
const productStore = useProductStore();
const isLoading = ref(false);
const route = useRoute();
const isSearching = ref(false);
const searchResultArr = ref([]);
const productsCollection = computed(() => productStore.getAllProducts);
onMounted(async () => {
  try {
    isLoading.value = true;
    const result = await productStore.findAllProducts();
    if (route.query.brand) {
      const result = productStore.getAllProducts.filter((item) => item.brand.toLowerCase().includes(route.query.brand.toLowerCase()));
      isLoading.value = false;
      searchResultArr.value = result;
      return;
    }
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
});
async function bringBackAllProducts() {
  isSearching.value = false;
  // searchResultArr.value = productStore.getAllProducts;
}
function search(keyword) {
  isSearching.value = true;
  keyCard.value = keyword;
  if (keyword === "") {
    bringBackAllProducts();
    return;
  }
  const result = productStore.getAllProducts.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
  searchResultArr.value = result;
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
