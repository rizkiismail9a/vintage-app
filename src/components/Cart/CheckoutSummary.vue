<template>
  <BaseModalOne
    v-if="showModal"
    image-link="/images/orderSuccess.gif"
    modal-msg="Order #ORD-89123-823 placed successfully"
    sub-modal-msg="Thank you for do online shopping at Vintage. You can track and see your order on transaction history menu."
  >
    <router-link to="/" class="btn btn-outline-primary" @click="showModal = false">Continue shopping</router-link>
    <router-link to="/profile/transaction-history" class="btn btn-primary">Go to History Transaction</router-link>
  </BaseModalOne>
  <div class="card summary__card w-100 position-sticky d-flex flex-column" style="top: 98px">
    <p class="font-400 mb-4 font-61">Order summary</p>
    <!-- summary list -->
    <div class="row summary__list">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <p class="font-400 font-61">Order</p>
        <p class="font-400 font-61">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice) }}</p>
      </div>
      <div class="col-12 d-flex justify-content-between align-items-center">
        <p class="font-400 font-61">Protection Fee</p>
        <p class="font-400 font-61">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(protectionFee) }}</p>
      </div>
      <div class="col-12 d-flex justify-content-between align-items-center">
        <p class="font-400 font-61">Shipping</p>
        <p class="font-400 font-61">{{ shippingFee }}</p>
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-between total__to__pay">
      <h2 class="font-500 font-0a" style="font-size: 16px">Total to pay</h2>
      <h2 class="font-500 font-0a" style="font-size: 16px">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice + shippingFee + protectionFee) }}</h2>
    </div>
    <button @click="order" class="btn btn-primary w-100 buy__button">Order Now</button>
  </div>
</template>

<script setup>
import BaseModalOne from "../Modal/BaseModalOne.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useProductStore } from "../../stores/product";
const showModal = ref(false);
const productStore = useProductStore();
const shippingFee = ref(17000);
const protectionFee = ref(0);
async function order() {
  await productStore.checkout();
  showModal.value = true;
}
const totalPrice = computed(() => {
  let prices = 0;
  if (productStore.buyAgain.length > 0) {
    productStore.buyAgain.forEach((item) => {
      prices += item.price * item.amount;
    });
    return prices;
  } else if (productStore.buyNow.length > 0) {
    productStore.buyNow.forEach((item) => {
      prices += item.price * item.amount;
    });
    return prices;
  } else {
    productStore.getCart.forEach((item) => {
      prices += item.price * item.amount;
    });
    return prices;
  }
});
</script>

<style scoped>
.summary__card {
  margin-bottom: 60px;
  padding: 24px;
  border: 1px solid #ededed;
}
.price__list {
  font-size: 18px;
  color: #0a0a0a;
}
.buy__button {
  margin-top: 20px;
  padding: 10px 16px 10px 16px;
}
@media screen and (max-width: 900px) and (min-width: 768px) {
  .total__to__pay {
    flex-direction: column;
    align-items: flex-start;
  }
  .summary__list {
    font-size: 14px;
  }
}
</style>
