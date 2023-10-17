<template>
  <div class="col-6 product__card" :class="{ 'col-md-3': isOnDetail === true, 'col-md-2': isOnDetail === false }">
    <div class="d-flex flex-column row-gap-2">
      <router-link to="/collection/id">
        <img src="../../assets/images/baju1.png" alt="gambar baju" class="product__image" />
      </router-link>
      <div class="product__info d-flex flex-column">
        <h3 class="product__price font-500">Rp200.000</h3>
        <h1 class="product__name flex-grow-1">Baju Kuning</h1>
        <div class="d-flex justify-content-between">
          <span class="product__size">8/M</span>
          <span class="like__button">
            <i class="fa-regular fa-heart"></i>
            12
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOnDetail: { type: Boolean, default: false },
});
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
