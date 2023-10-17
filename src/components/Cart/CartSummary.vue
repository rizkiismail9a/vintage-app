<template>
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
    <button @click="checkout" class="btn btn-primary w-100 checkout__button">Checkout(4)</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function checkout() {
  router.push("/cart/checkout-card/checkout-summary");
}
</script>

<style scoped>
.summary__card {
  margin-bottom: 140px;
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
