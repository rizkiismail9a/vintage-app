<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <div v-if="cartContent.length !== 0 && !isLoading" class="address mx-4 d-flex gap-3 align-items-center p-0">
    <img src="../../assets/images/addressPin.png" alt="address pin" width="16" />
    <p class="m-0 font-40">
      Shipping to <b style="color: #0a0a0a">{{ user.regency }}, {{ user.province }}</b>
    </p>
  </div>
  <!-- if the cart is empty -->
  <div v-else-if="cartContent.length === 0 && !isLoading" class="empty__msg d-flex gap-3 flex-column align-items-center justify-content-center mx-auto">
    <img src="/images/emptyCart.png" alt="" width="118" height="118" />
    <div>
      <h3 class="font-500 text-center" style="font-size: 28px">Your cart still empty</h3>
      <p class="font-400 font-40 text-center">Find your favorite items and add to cart before check out.</p>
    </div>
    <router-link to="/collection" class="btn btn-primary find__product">Find Products</router-link>
  </div>
  <!-- looping di sini -->
  <div v-for="(product, index) in cartContent" :key="product.productKey" class="cart__product-card bg-white d-flex flex-column gap-4">
    <div class="product__info d-flex gap-4 flex-grow-1">
      <img :src="product.imageLink" alt="gambar produk" width="80" class="object-fit-cover" height="80" />
      <div class="d-flex flex-column justify-content-between">
        <div class="product__metadata m-0 flex-grow-1">
          <p class="m-0 font-400 product__name text-truncate">{{ product.name }}</p>
          <p class="m-0 font-400" style="font-size: 12px; letter-spacing: 0.1px; color: #404040">{{ product.size }}</p>
        </div>
        <p class="my-0 font-500" style="font-size: 14px; color: #0a0a0a">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price * product.amount) }}</p>
      </div>
    </div>
    <div class="product__action d-flex justify-content-between align-items-center">
      <p class="remove my-0 font-500 pointer" style="color: #cb3a31" @click="removeProduct(product.cartKey, index)">Remove</p>
      <div class="amount border rounded d-flex align-items-center justify-content-evenly font-500" style="color: #404040">
        <span
          class="d-block text-center decrement_btn"
          @click="
            product.amount--;
            changeAmount(product.amount, product.cartKey, index);
          "
          >-</span
        >
        <input type="number" class="d-block text-center" min="1" v-model="product.amount" @keyup="changeAmount(product.amount, product.cartKey, index)" />
        <span
          class="d-block text-center increment_btn"
          @click="
            product.amount++;
            changeAmount(product.amount, product.cartKey, index);
          "
          >+</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useProductStore } from "../../stores/product";
const authStore = useAuthStore();
const productStore = useProductStore();
const isLoading = ref(false);
const user = computed(() => {
  return authStore.getUser;
});
onMounted(async () => {
  try {
    isLoading.value = true;
    await productStore.findCartContent();
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
});
const cartContent = computed(() => {
  return productStore.getCart;
});
async function changeAmount(inputan, cartKey, index) {
  const cartContent = productStore.getCart;
  try {
    if (inputan < 1) {
      cartContent[index].amount = 1;
      inputan = 1;
    }
    await productStore.updateCartAmount({ inputan, cartKey });
  } catch (error) {
    console.log(error);
  }
}
async function removeProduct(cartKey, index) {
  try {
    await productStore.removeFromCart({ cartKey, index });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.cart__product-card {
  padding: 16px 16px 16px 0px;
}
.product__name {
  font-size: 14px;
  color: #0a0a0a;
  line-height: 2;
}
.address {
  margin-top: 12px;
}
.decrement_btn {
  width: 32px;
  height: 32px;
  padding-top: 4px;
  border-right: 1px solid #ededed;
  cursor: pointer;
}
.increment_btn {
  width: 32px;
  height: 32px;
  padding-top: 4px;
  border-left: 1px solid #ededed;
  cursor: pointer;
}
input {
  width: 32px;
  height: 32px;
  padding-top: 4px;
  border: none;
}
.empty__msg {
  margin-top: 68px;
  width: 343px;
  margin-bottom: 80px;
}
.find__product {
  padding: 10px 16px 10px 16px;
  width: 234px;
}
</style>
