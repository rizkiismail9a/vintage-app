<template>
  <NavbarComponent :is-at-collection="true" @search="search"></NavbarComponent>
  <SideBarMenu :isSidebarActive="showSidebar" @hide-sidebar="showSidebar = !showSidebar" @filterByPrice="filterByPrice" @sortByPrice="sortByPrice" @filterBySize="filterBySize"></SideBarMenu>

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
    <div class="overlay__button d-flex align-items-center w-100 justify-content-between">
      <div class="d-flex align-items-center gap-2 pointer" @click="showSidebar = true">
        <p class="font-0a font-500 m-0">Filter</p>
        <i class="fa-solid fa-sliders"></i>
      </div>
      <div class="d-flex align-items-center gap-2 pointer" v-if="showResetButton" @click="resetFilter">
        <p class="font-0a font-500 m-0">Reset Filter</p>
        <i class="fa-solid fa-xmark" style="font-size: 18px"></i>
      </div>
    </div>
    <div v-if="isLoading" class="d-flex h-100 mx-auto p-5 justify-content-center align-items-center">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else-if="!isLoading" class="products__wrapper row gx-4 gy-5">
      <ProductCard v-for="item in productsCollection" :product="item"></ProductCard>
    </div>
    <product-not-found v-if="!productsCollection.length && !isLoading" image-link="/images/bag-cross.png" pop-message="Product not found" sub-message="We cannot find what you looking for, try to use other keywords or reset keyword.">
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
import { ref, computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "../components/Loading/LoadingSpinner.vue";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import ProductNotFound from "../components/Products/ProductNotFound.vue";
import SideBarMenu from "../components/Overlayout/SideBarMenu.vue";
import { useProductStore } from "../stores/product";
const keyCard = ref("");
const productStore = useProductStore();
const isLoading = ref(false);
const route = useRoute();
const isSearching = ref(false);
const showSidebar = ref(null);
const showResetButton = ref(false);
const productsCollection = ref([]);
onMounted(async () => {
  try {
    isLoading.value = true;
    await productStore.findAllProducts();
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
});
watchEffect(() => {
  if (route.query.brand) {
    const result = productStore.getAllProducts.filter((item) => {
      return item.brand.toLowerCase().includes(route.query.brand.toLowerCase());
    });
    productsCollection.value = result;
  } else {
    productsCollection.value = productStore.getAllProducts;
  }
});
async function bringBackAllProducts() {
  isSearching.value = false;
  productsCollection.value = productStore.getAllProducts;
}
function search(keyword) {
  isSearching.value = true;
  keyCard.value = keyword;
  if (keyword === "") {
    bringBackAllProducts();
    return;
  }
  const result = productStore.getAllProducts.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
  console.log(result);
  productsCollection.value = result;
}
async function filterByPrice({ startAt, endAt }) {
  isLoading.value = true;
  showResetButton.value = true;
  const result = await productStore.filterByPriceRange({ startAt, endAt });
  productsCollection.value = result;
  isLoading.value = false;
}
function resetFilter() {
  isLoading.value = true;
  showResetButton.value = false;
  productsCollection.value = productStore.getAllProducts;
  isLoading.value = false;
}
function sortByPrice(mode) {
  const products = productsCollection.value;
  showResetButton.value = true;
  if (mode === "ascending") {
    const result = products.sort((a, b) => a.price - b.price);
    productsCollection.value = result;
  } else {
    const result = products.sort((a, b) => b.price - a.price);
    productsCollection.value = result;
  }
}
function filterBySize(size) {
  const products = productStore.getAllProducts;
  showResetButton.value = true;
  const result = products.filter((item) => item.size === size);
  productsCollection.value = result;
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
