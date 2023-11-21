<template>
  <!-- <NavbarComponent /> -->
  <!-- banner -->
  <BannerView></BannerView>
  <!-- main session -->
  <main class="main__container container font-main">
    <!-- Popular Items -->
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <products-list v-else product-title="Popular Products" :products="popularProducts"></products-list>
    <!-- Shop by brand -->
    <div class="shop-by-brand container">
      <div class="shop-by-brand__title">
        <h2 class="font-500" style="font-size: 24px">Shop by brand</h2>
      </div>
      <div class="brands d-flex justify-content-between overflow-x-scroll">
        <div class="brand__cards" v-for="b in brands" @click="findByBrand(b)">
          {{ b }}
        </div>
      </div>
    </div>
    <!-- New products -->
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <products-list v-else product-title="New Products" class="new-products" :products="newProducts"></products-list>
  </main>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import LoadingSpinner from "../components/Loading/LoadingSpinner.vue";
import NavbarComponent from "../components/Navbar/NavbarComponent.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import BannerView from "../components/Header/BannerView.vue";
import ProductsList from "../components/Products/ProductsList.vue";
import { useProductStore } from "../stores/product";
import { useRouter } from "vue-router";
const brands = ref(["Vans", "Boho", "Mango", "Reebok", "Converse", "Sandro", "Nike", "Adidas", "Dior", "Puma", "Zara", "Bershka", "American Eagle"]);
const router = useRouter();
const productStore = useProductStore();
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  await productStore.findAllProducts();
  popularProducts = productStore.popularProduct;
  isLoading.value = false;
});
let popularProducts = reactive(productStore.popularProduct);

const newProducts = computed(() => {
  return productStore.newProduct;
});

function findByBrand(brand) {
  router.push({
    name: "Collection",
    query: { brand },
  });
}
</script>
<style scoped>
.main__container {
  padding-top: 46px;
  margin-bottom: 140px;
  min-height: 100vh;
}
.new-products,
.shop-by-brand {
  margin-top: 56px;
}
.shop-by-brand {
  padding: 0 12px;
}
.shop-by-brand__title {
  margin-bottom: 20px;
}

.brand__cards {
  width: fit-content;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px 16px;
  font-weight: 500;
  font-size: 14px;
  color: #404040;
  cursor: pointer;
}
</style>
