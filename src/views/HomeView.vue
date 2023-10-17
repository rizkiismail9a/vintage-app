<template>
  <NavbarComponent />
  <!-- banner -->
  <BannerView></BannerView>
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
        <div class="brand__cards" v-for="b in brands" @click="findByBrand(b)">
          {{ b }}
        </div>
      </div>
    </div>
    <!-- New products -->
    <products-list product-title="New Products" class="new-products"></products-list>
  </main>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref } from "vue";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import BannerView from "../components/Header/BannerView.vue";
import ProductsList from "../components/Products/ProductsList.vue";
import { useRouter } from "vue-router";
const brands = ref(["Vans", "Boho", "Mango", "Reebok", "Converse", "Sandro", "Nike", "Adidas", "Dior", "Puma", "Zara", "Bershka", "American Eagle"]);
const router = useRouter();
function findByBrand(brand) {
  router.push({
    name: "Collection",
    query: { brand },
  });
}
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
  cursor: pointer;
}
</style>
