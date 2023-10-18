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
    <p style="color: #616161" class="font-400 mb-4">Order summary</p>
    <!-- price list -->
    <div class="row">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <p class="font-400" style="color: #616161">Order</p>
        <p class="font-400" style="color: #616161">Rp800.000</p>
      </div>
      <div class="col-12 d-flex justify-content-between align-items-center">
        <p class="font-400" style="color: #616161">Protection Fee</p>
        <p class="font-400" style="color: #616161">Rp0</p>
      </div>
      <div class="col-12 d-flex justify-content-between align-items-center">
        <p class="font-400" style="color: #616161">Shipping</p>
        <p class="font-400" style="color: #616161">Rp17.000</p>
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="font-500 font-0a" style="font-size: 16px">Total to pay</h2>
      <h2 class="font-500 font-0a" style="font-size: 16px">Rp817.000</h2>
    </div>
    <button @click="order" class="btn btn-primary w-100 buy__button">Order Now</button>
  </div>
</template>

<script setup>
import BaseModalOne from "../Modal/BaseModalOne.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const showModal = ref(false);
const router = useRouter();
function order() {
  showModal.value = true;
}
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
</style>
