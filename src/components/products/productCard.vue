<template>
  <div class="col-6 product__card" :class="{ 'col-md-3': isOnDetail === true, 'col-md-2': isOnDetail === false }">
    <div class="d-flex flex-column row-gap-2">
      <div @click="goToDetail" class="pointer">
        <img :src="props.product.imageLink" :alt="props.product.name" class="product__image w-100" />
      </div>
      <div class="product__info d-flex flex-column">
        <h3 class="product__price font-500">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(props.product.price) }}</h3>
        <h1 class="product__name flex-grow-1">{{ props.product.name }}</h1>
        {{ typeof props.product.productKey }}
        <div class="d-flex justify-content-between">
          <span class="product__size">{{ props.product.size }}</span>
          <span class="like__button">
            <i class="fa-regular fa-heart"></i>
            {{ props.product.likes.length }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  product: { type: Object },
  isOnDetail: { type: Boolean, default: false },
});
const router = useRouter();
function goToDetail() {
  router.push({ name: "Detail Product", params: { id: props.product.productKey } });
}
</script>
<style scoped>
.product__card {
  height: 300px;
}
.product__image {
  height: 200px;
  object-fit: cover;
  margin-bottom: 8px;
}
.product__price {
  font-size: 16px;
  color: #0d5054;
}
.product__name {
  font-size: 14px;
  font-weight: 400;
  color: #404040;
  height: 40px;
}
.product__size,
.like__button {
  font-size: 14px;
  color: #616161;
}
</style>
