<template>
  <NavbarComponent></NavbarComponent>
  <div class="cart__wrapper container row mx-auto gx-4">
    <div class="cart__products col-md-8">
      <!-- cart title -->
      <div class="cart__title d-flex justify-content-between align-items-center">
        <h1 class="font-500">Cart</h1>
        <p class="cart__amount font-500">4 items</p>
      </div>
      <!-- products and address -->
      <div class="cart__product-list d-flex flex-column gap-3 mb-5">
        <div class="address mx-4 d-flex gap-4 align-items-center">
          <img src="../assets/images/addressPin.png" alt="address pin" width="16" />
          <p class="m-0" style="color: #404040">Shipping to <b style="color: #0a0a0a">Cianjur, Jawa Barat</b></p>
        </div>
        <cart-product-card></cart-product-card>
        <cart-product-card></cart-product-card>
        <cart-product-card></cart-product-card>
      </div>
      <!-- other product list -->
      <div class="other__product d-flex flex-column w-100">
        <div class="products__title d-flex flex-row justify-content-between align-items-center" style="margin-bottom: 24px">
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
    <div class="cart__summary col-md-4">
      <div class="card summary__card w-100 position-sticky" style="top: 88px">
        <div class="subtotal__price d-flex justify-content-between font-500">
          <p>Order Summary</p>
          <p>Rp800.000</p>
        </div>
        <div class="total__item d-flex justify-content-between font-400">
          <p>4 item</p>
          <p>Not include shipping fee</p>
        </div>
        <hr />
        <button class="btn btn-primary w-100 checkout__button">Checkout(4)</button>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import ProductCard from "../components/Products/ProductCard.vue";
import CartProductCard from "../components/Cart/CartProductCard.vue";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import FooterComponent from "../components/footer/FooterComponent.vue";
</script>

<style scoped>
.cart__title {
  margin-top: 88px;
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
  background-color: #f5f5f5;
  padding: 12px 0 12px 0;
}
.other__product {
  margin-bottom: 150px;
}

.summary__card {
  margin-top: 88px;
  padding: 24px;
  border: 1px solid #ededed;
}
.subtotal__price {
  font-size: 18px;
  color: #0a0a0a;
}
.total__item {
  font-size: 12px;
  color: #616161;
}
.checkout__button {
  margin-top: 20px;
  padding: 10px 16px 10px 16px;
}
</style>
