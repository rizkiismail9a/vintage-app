<template>
  <div class="popular-products container">
    <div class="popular__title d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-500" style="font-size: 24px">Popular Items</h2>
      <p class="m-0 font-400" style="color: #009499">See all</p>
    </div>
    <div class="popular-products__cards row gx-4 m-0">
      <!-- product cards -->
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <!-- see-all menu -->
      <div class="col-md-2 col-6">
        <div class="see-all-menu d-flex font-400 align-items-center justify-content-center mx-auto text-center p-0 h-100">See All <br />Products</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import productCard from "./productCard.vue";
</script>
<style scoped>
.see-all-menu {
  color: #009499;
  background-color: #effefd;
  border: 1px solid #c2fafd;
}
.popular__title {
  margin-bottom: 24px;
  padding: 0 12px;
}
</style>
