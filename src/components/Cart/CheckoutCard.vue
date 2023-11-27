<template>
  <div class="checkout__card d-flex flex-column gap-4 bg-white">
    <p style="color: #616161" class="font-400">Order</p>
    <!-- checkout__list looping di sini-->
    <div v-if="isLoading" class="d-flex justify-content-center">
      <Icon icon="line-md:loading-loop" color="#009499" width="150" />
    </div>
    <div v-else class="product__info d-flex gap-4 flex-grow-1 p-0" v-for="product in cartContent">
      <img :src="images[0]" alt="gambar produk" width="48" class="object-fit-cover" height="48" />
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
import { Icon } from "@iconify/vue";
import AddressCard from "./AddressCard.vue";
import DelivaryCard from "./DelivaryCard.vue";
import PaymentCard from "./PaymentCard.vue";
import { useProductStore } from "../../stores/product";
import { computed, onBeforeMount, ref } from "vue";
const isLoading = ref(true);
const productStore = useProductStore();
onBeforeMount(async () => {
  try {
    await productStore.findCartContent();
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
});
const images = computed(() => {
  let imageLinks = [];
  if (productStore.getCart.length) {
    for (let i = 0; i < productStore.getCart.length; i++) {
      for (let key in productStore.getCart[i].imageLink) {
        imageLinks.push(productStore.getCart[i].imageLink[key]);
      }
    }
  } else if (productStore.buyAgain.length) {
    for (let i = 0; i < productStore.buyAgain.length; i++) {
      for (let key in productStore.buyAgain[i].imageLink) {
        imageLinks.push(productStore.buyAgain[i].imageLink[key]);
      }
    }
  } else {
    for (let i = 0; i < productStore.buyNow.length; i++) {
      for (let key in productStore.buyNow[i].imageLink) {
        imageLinks.push(productStore.buyNow[i].imageLink[key]);
      }
    }
  }

  return imageLinks;
});
const cartContent = computed(() => {
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
