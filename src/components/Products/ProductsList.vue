<template>
  <div class="container">
    <div class="products__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500" style="font-size: 24px">{{ props.productTitle }}</h2>
      <router-link to="/collection" class="m-0 font-400" style="color: #009499" v-if="!props.isForCollection">See all</router-link>
    </div>
    <!-- list of products -->
    <div class="popular-products__cards row gx-4 gy-md-0 gy-4 m-0">
      <!-- product cards , looping starts here-->
      <product-card v-for="item in products" :product="item"></product-card>
      <!-- see-all menu -->
      <router-link to="/collection" class="col-md-2 col-6">
        <div class="see-all-menu d-flex font-400 align-items-center justify-content-center mx-auto text-center p-0 h-100">See All <br />Products</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";
const props = defineProps({
  productTitle: { type: String },
  products: { type: Array },
  isForCollection: { type: Boolean, default: false },
});
</script>
<style scoped>
.see-all-menu {
  color: #009499;
  background-color: #effefd;
  border: 1px solid #c2fafd;
}
.products__title {
  margin-bottom: 24px;
  padding: 0 12px;
}
</style>
