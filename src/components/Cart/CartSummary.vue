<template>
  <div class="card summary__card w-100 position-sticky" style="top: 88px">
    <div class="subtotal__price d-flex justify-content-between font-500">
      <p>Order Summary</p>
      <p>{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice) }}</p>
    </div>
    <div class="total__item d-flex justify-content-between font-400">
      <p>{{ cartLength }} items</p>
      <p>Not include shipping fee</p>
    </div>
    <hr />
    <button v-if="cartLength > 0" @click="checkout" class="btn btn-primary w-100 checkout__button">Checkout({{ cartLength }})</button>
    <span v-else class="w-100 disabled checkout__button text-center text-white">Checkout</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../../stores/product";
const router = useRouter();
const productStore = useProductStore();
// const totalPrice = ref(0);
function checkout() {
  router.push("/cart/checkout-card/checkout-summary");
}
const cartLength = computed(() => {
  return productStore.getCart.length;
});
const totalPrice = computed(() => {
  let prices = 0;
  productStore.getCart.forEach((item) => {
    prices += item.price * item.amount;
  });
  return prices;
});
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
.disabled {
  background-color: #e0e0e0;
  box-shadow: 0px 1px 3px 0px #1018281a;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px #1018280f;
}
@media screen and (max-width: 900px) and (min-width: 768px) {
  .subtotal__price,
  .total__item {
    flex-direction: column;
    line-height: 0.8;
    align-items: flex-start;
  }
  .checkout__button {
    margin-top: 12px;
  }
}
</style>
