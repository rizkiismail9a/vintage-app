<template>
  <div class="checkout__card d-flex flex-column gap-4 bg-white">
    <p style="color: #616161" class="font-400">Order</p>
    <!-- checkout__list looping di sini-->
    <div v-if="isLoading" class="d-flex justify-content-center">
      <loading-spinner></loading-spinner>
    </div>
    <div v-else class="product__info d-flex gap-4 flex-grow-1 p-0" v-for="product in getCart">
      <img :src="product.imageLink" alt="gambar produk" width="48" class="object-fit-cover" height="48" />
      <div class="d-flex flex-column justify-content-between flex-grow-1">
        <div class="product__metadata m-0 flex-grow-1">
          <h1 class="m-0 font-400 product__name d-flex align-items-center justify-content-between w-100">
            {{ product.name }} <span>{{ product.amount }}x</span>
          </h1>
          <p class="m-0 font-400" style="font-size: 12px; letter-spacing: 0.1px; color: #404040">{{ product.size }}</p>
        </div>
        <p class="my-0 font-500 font-0a">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price * product.amount) }}</p>
      </div>
    </div>
  </div>
  <!-- address card -->
  <address-card></address-card>
  <!-- delivary card -->
  <delivary-card></delivary-card>
  <!-- payment card -->
  <payment-card></payment-card>
</template>

<script setup>
import LoadingSpinner from "../Loading/LoadingSpinner.vue";
import AddressCard from "./AddressCard.vue";
import DelivaryCard from "./DelivaryCard.vue";
import PaymentCard from "./PaymentCard.vue";
import { useProductStore } from "../../stores/product";
import { computed, onMounted, ref } from "vue";
const isLoading = ref(false);
onMounted(async () => {
  try {
    isLoading.value = true;
    await productStore.findCartContent();
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
});
const productStore = useProductStore();
const getCart = computed(() => {
  if (productStore.getCart.length) {
    return productStore.cart;
  } else if (productStore.buyAgain.length) {
    return productStore.buyAgain;
  } else {
    return productStore.buyNow;
  }
});
</script>

<style scoped>
.checkout__card {
  padding: 20px 24px 20px 24px;
  border: 1px solid #ededed;
  border-radius: 12px;
}
.product__name {
  font-size: 14px;
  color: #0a0a0a;
  line-height: 2;
}
</style>
