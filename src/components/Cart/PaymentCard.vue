<template>
  <div class="card payment__card">
    <p class="font-400 font-61">Payment details</p>
    <div class="user__payment border rounded d-flex gap-3 align-items-center" style="padding: 16px" id="payment_element">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1600px-PayPal.svg.png?20230314142951" alt="" height="40" width="40" class="align-self-start object-fit-contain" />
      <div>
        <p class="font-500 font-0a m-0">PayPal</p>
        <div style="color: #616161; word-spacing: 0.1rem" class="font-400 m-0 d-flex align-items-center gap-2">
          <span>newbook9a</span>
          <i class="fa-solid fa-circle" style="font-size: 3px"></i>
          <span>dudung@mail.com</span>
        </div>
        <p style="color: #616161; font-size: 12px" class="font-400 mb-0 mt-3"><i class="fa-regular fa-credit-card me-1"></i> Dudung Sarudung</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useProductStore } from "../../stores/product";
import { useRouter } from "vue-router";
const errorMsg = ref("");
const authStore = useAuthStore();
const productStore = useProductStore();

const totalPrice = ref(0);

onMounted(() => {
  let prices = 0;
  if (productStore.buyAgain.length > 0) {
    productStore.buyAgain.forEach((item) => {
      prices += item.price * item.amount;
    });
    totalPrice.value = prices;
  } else if (productStore.buyNow.length > 0) {
    productStore.buyNow.forEach((item) => {
      prices += item.price * item.amount;
    });
    totalPrice.value = prices;
  } else {
    productStore.getCart.forEach((item) => {
      prices += item.price * item.amount;
    });
    totalPrice.value = prices;
  }
});
</script>

<style scoped>
.payment__card {
  padding: 20px 24px 20px 24px;
  border: 1px solid #ededed;
  border-radius: 12px;
}
</style>
