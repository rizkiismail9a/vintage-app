<template>
  <NavbarComponent></NavbarComponent>
  <div class="cart__wrapper container row mx-auto gx-4 flex-column flex-md-row" :class="{ 'bg-f5': getRoute === 'checkout-card' }">
    <div class="cart__products col-md-8">
      <!-- cart title -->
      <div v-if="getParams1 === 'cart-product-card'" class="cart__title d-flex justify-content-between align-items-center border-bottom">
        <h1 class="font-500">Cart</h1>
        <p v-if="cartLength > 0" class="cart__amount font-500">{{ cartLength }} items</p>
        <p v-else class="cart__amount font-500">You don’t have any item yet</p>
      </div>
      <!-- products and address -->
      <div class="cart__product-list d-flex flex-column gap-4 mb-5" :class="{ 'bg-f5': cartLength > 0 }">
        <component :is="component1[getParams1]"></component>
        <!-- <cart-product-card></cart-product-card> -->
      </div>
      <!-- summary, for phone -->
      <div class="cart__summary col-md-4 d-md-none d-block">
        <component :is="component2[getParams2]"></component>
        <!-- <cart-summary></cart-summary> -->
      </div>
      <!-- other product list -->
      <div v-if="getParams1 === 'cart-product-card'" class="other__product d-flex flex-column w-100">
        <div class="products__title d-flex flex-row justify-content-between align-items-center" style="margin-bottom: 24px">
          <h2 class="font-500" style="font-size: 24px">Other Products</h2>
        </div>
        <div class="row gy-5">
          <product-card :is-on-detail="true" v-for="p in getProducts" :product="p"></product-card>
        </div>
      </div>
    </div>
    <div class="cart__summary col-md-4 d-md-block d-none">
      <component :is="component2[getParams2]"></component>
      <!-- <cart-summary></cart-summary> -->
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import ProductCard from "../components/Products/ProductCard.vue";
import CartProductCard from "../components/Cart/CartProductCard.vue";
import NavbarComponent from "../components/Navbar/NavbarComponent.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import CartSummary from "../components/Cart/CartSummary.vue";
import CheckoutCart from "../components/Cart/CheckoutCard.vue";
import CheckoutSummary from "../components/Cart/CheckoutSummary.vue";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product.js";
import { useAuthStore } from "../stores/auth";
const route = useRoute();
const productStore = useProductStore();
const authStore = useAuthStore();
onMounted(async () => {
  // Ini dipakai untuk ambil other products
  // await productStore.findAllProducts();
  await productStore.findCartContent();
});
const component1 = {
  "cart-product-card": CartProductCard,
  "checkout-card": CheckoutCart,
};
const component2 = {
  "cart-summary": CartSummary,
  "checkout-summary": CheckoutSummary,
};
const getParams1 = computed(() => {
  return route.params.component1;
});
const getParams2 = computed(() => {
  return route.params.component2;
});
const getProducts = computed(() => {
  return productStore.getOtherProducts;
});
const cartLength = computed(() => {
  const cartObject = authStore.getUser?.cart;
  if (cartObject) {
    return Object.keys(authStore.getUser.cart).length;
  } else {
    return 0;
  }
});
</script>

<style scoped>
.bg-f5 {
  background-color: #f5f5f5;
}
.cart__wrapper {
  padding-top: 88px;
  margin-bottom: 140px;
  min-height: 100vh;
}
.bg-f5 {
  background-color: #f5f5f5;
}
.cart__title {
  padding-top: 24px;
  padding-bottom: 20px;
  margin-bottom: 21px;
}
.cart__title h1 {
  font-size: 24px;
}
.cart__amount {
  border: 1px solid #ededed;
  border-radius: 6px;
  padding: 2px 8px 2px 8px;
}
.cart__product-list {
  padding: 12px 0 12px 0;
}
.other__product {
  margin-bottom: 150px;
}
@media screen and (max-width: 900px) {
  .cart__wrapper {
    /* padding-top: 140px !important; */
    margin-bottom: 20px;
  }
}
</style>
