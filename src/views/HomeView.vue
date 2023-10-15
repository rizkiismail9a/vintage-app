<template>
  <NavbarComponent />
  <!-- banner -->
  <bannerView></bannerView>
  <!-- main session -->
  <main class="main__container container font-main">
    <!-- Popular Items -->
    <productsList product-title="Popular Products"></productsList>
    <!-- Shop by brand -->
    <div class="shop-by-brand container">
      <div class="shop-by-brand__title">
        <h2 class="font-500" style="font-size: 24px">Shop by brand</h2>
      </div>
      <div class="brands d-flex justify-content-between">
        <div class="brand__cards" v-for="b in brands">{{ b }}</div>
      </div>
    </div>
    <!-- New products -->
    <productsList product-title="New Products" class="new-products"></productsList>
  </main>
</template>

<script setup>
import { ref } from "vue";
import NavbarComponent from "../components/Navbar/NavbarComponent.vue";
import bannerView from "../components/header/bannerView.vue";
import productsList from "../components/products/productsList.vue";
const brands = ref(["Vans", "Boho", "Mango", "Reebok", "Converse", "Sandro", "Nike", "Adidas", "Dior", "Puma", "Zara", "Bershka", "American Eagle"]);
</script>
<style scoped>
.main__container {
  margin-top: 46px;
  margin-bottom: 140px;
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
}
</style>
