<template>
  <base-modal-one
    @closeModal="showModal = false"
    v-if="showModal"
    image-link="/images/cartModal.gif"
    modal-msg="Product successfully added to cart"
    :sub-modal-msg="'“Vintage chicago cubs white” successfully added to cart. Check now on the cart or continue shopping.'"
  >
    <button class="btn btn-outline-primary" @click="showModal = false">Continue shopping</button>
    <router-link to="/cart/cart-product-card/cart-summary" class="btn btn-primary">Go to cart</router-link>
  </base-modal-one>
  <NavbarComponent></NavbarComponent>
  <div v-if="isLoading" class="detail__wrapper d-flex justify-content-center align-items-center h-100">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <!-- product img -->
  <div class="detail__wrapper container mx-auto">
    <div class="row gx-3 flex-column flex-md-row detail-card__and__image">
      <div class="col-md-8 row d-flex">
        <img class="detail__image w-100 object-fit-cover" :src="detailProduct.imageLink" alt="product name" />
        <!-- other product list -->
      </div>
      <!-- detail information -->
      <div class="col-md-4">
        <detail-information-card @addToCart="addToCart" @buyNow="buyNow"></detail-information-card>
      </div>
    </div>
    <div class="other__product d-flex flex-column w-100">
      <div class="products__title d-flex flex-row justify-content-between align-items-center">
        <h2 class="font-500" style="font-size: 24px">Other Products</h2>
      </div>
      <div class="row gx-3">
        <div class="col-md-8">
          <div class="row gy-5">
            <product-card :is-on-detail="true" v-for="p in relatedProduct" :product="p"></product-card>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent></FooterComponent>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import LoadingSpinner from "../components/Loading/LoadingSpinner.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import FooterComponent from "../components/footer/FooterComponent.vue";
import DetailInformationCard from "../components/Detail/DetailInformationCard.vue";
import BaseModalOne from "../components/Modal/BaseModalOne.vue";
import { useProductStore } from "../stores/product";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const showModal = ref(false);
const authStore = useAuthStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await productStore.findOneProduct(route.params.id);
  await productStore.findRelatedProduct();
  isLoading.value = false;
});
const detailProduct = computed(() => {
  return productStore.getProductDetail;
});
const relatedProduct = computed(() => {
  const data = productStore.getRelatedProducts;
  return data.filter((item) => item.productKey !== route.params.id);
});
async function addToCart() {
  if (!authStore.getLogin) {
    return router.push("/login");
  }
  try {
    await productStore.addToCart(route.params.id);
    showModal.value = true;
  } catch (error) {
    console.log(error);
  }
}
async function buyNow() {
  if (!authStore.getLogin) {
    return router.push("/login");
  }
  try {
    await productStore.buyTheProductNow(route.params.id);
    router.push("/cart/checkout-card/checkout-summary");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.detail__wrapper {
  padding-top: 104px;
  margin-bottom: 140px;
  min-height: 100vh;
}
.detail__image {
  margin-bottom: 40px;
}
.products__title {
  margin-bottom: 24px;
}
@media screen and (max-width: 768px) {
  .other__product {
    width: 100% !important;
  }
  .detail-card__and__image {
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
