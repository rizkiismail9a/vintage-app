<template>
  <base-modal-one
    @closeModal="showModal = false"
    v-if="showModal"
    image-link="/images/cartModal.gif"
    modal-msg="Product successfully added to cart"
    :sub-modal-msg="'“Vintage chicago cubs white” successfully added to cart. Check now on the cart or continue shopping.'"
  >
    <button class="btn btn-outline-primary" @click="showModal = false">Continue shopping</button>
    <router-link to="/cart" class="btn btn-primary">Go to cart</router-link>
  </base-modal-one>
  <NavbarComponent></NavbarComponent>
  <div class="detail__wrapper container-md mx-auto row gx-5 flex-column-reverse flex-md-row">
    <div class="col-md-8 row d-flex">
      <img class="detail__image w-100 object-fit-cover" src="../assets/images/baju1.png" alt="product name" />
      <!-- other product list -->
      <div class="other__product d-flex flex-column w-100">
        <div class="products__title d-flex flex-row justify-content-between align-items-center">
          <h2 class="font-500" style="font-size: 24px">Other Products</h2>
        </div>
        <div class="row gy-5">
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
          <product-card :is-on-detail="true"></product-card>
        </div>
      </div>
    </div>
    <!-- detail information -->
    <div class="col-md-4">
      <detail-information-card @addToCart="addToCart"></detail-information-card>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref } from "vue";
import ProductCard from "../components/Products/ProductCard.vue";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import FooterComponent from "../components/footer/FooterComponent.vue";
import DetailInformationCard from "../components/Detail/DetailInformationCard.vue";
import BaseModalOne from "../components/Modal/BaseModalOne.vue";
const showModal = ref(false);
function addToCart() {
  showModal.value = true;
}
</script>

<style scoped>
.detail__wrapper {
  margin-top: 88px;
  margin-bottom: 140px;
}
.detail__image {
  margin-bottom: 40px;
}
.products__title {
  margin-bottom: 24px;
}
</style>
