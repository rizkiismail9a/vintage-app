<template>
  <div class="detail__information card d-flex flex-column position-sticky" style="top: 100px">
    <!-- price -->
    <div class="d-flex justify-content-between flex-column">
      <div class="d-flex justify-content-between detail__price mb-2">
        <h3>{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price) }}</h3>
        <i class="fa-regular fa-heart"></i>
      </div>
      <p class="detail__name mb-2">{{ product.name }}</p>
      <div class="detail__size d-flex align-items-center w-75 justify-content-between mb-2">
        <span>{{ product.size }} </span>
        <i class="fa-solid fa-circle" style="font-size: 5px"></i>
        <span>{{ product.quality }}</span>
        <i class="fa-solid fa-circle" style="font-size: 5px"></i>
        <span>{{ uploader.regency }}</span>
      </div>
    </div>
    <hr />
    <p class="font-400 font-40" style="font-size: 14px">Item Description</p>
    <p class="font-400 font-0a" style="font-size: 14px">{{ product.description }}</p>
    <div class="detail__metadata row gx-3">
      <p class="col-6 font-0a">Store name</p>
      <p class="col-6 font-40">{{ uploader.fullname }}</p>
      <p class="col-6 font-0a">Cetagory</p>
      <p class="col-6 font-40">{{ product.cetagory }}</p>
      <p class="col-6 font-0a">Brand</p>
      <p class="col-6 font-40">{{ product?.brand || "-" }}</p>
      <p class="col-6 font-0a">Condition</p>
      <p class="col-6 font-40">{{ product.quality }}</p>
      <p class="col-6 font-0a">Uploaded</p>
      <p class="col-6 font-40">{{ new Date(product.createdAt).toLocaleDateString("en-EN", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) }}</p>
      <p class="col-6 font-0a">Shipping</p>
      <p class="col-6 font-40">Rp20.000</p>
    </div>
    <hr />
    <div class="detail__button d-flex flex-column flex-grow-1 gap-3 my-2">
      <button class="btn btn-primary">Buy Now</button>
      <button class="btn btn-outline-primary" @click="$emit('addToCart')">Add to Cart</button>
    </div>
    <hr />
    <div class="detail__review border rounded d-flex gap-3">
      <img src="../../assets/images/user1.png" alt="" width="40" height="40" />
      <div>
        <p style="color: #0a0a0a; font-size: 14px" class="font-500 m-0">Dudung Sarudung</p>
        <div class="star">
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <span style="color: #616161; font-size: 12px"> (110)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "../../stores/product";
import { useAuthStore } from "../../stores/auth";
const productStore = useProductStore();
const authStore = useAuthStore();
const product = computed(() => {
  return productStore.getProductDetail;
});
const uploader = computed(() => {
  return authStore.userById;
});
</script>

<style scoped>
.detail__information {
  padding: 24px;
  border-radius: 8px;
}
.detail__price {
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
  color: #0a0a0a;
}
.detail__name {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
  color: #0a0a0a;
}
.detail__size {
  font-size: 14px;
  font-weight: 400;
  color: #616161;
}
.detail__review {
  border-color: #ededed !important;
  padding: 16px;
}
@media screen and (max-width: 768px) {
  .detail__information {
    margin: 88px 0;
  }
  .detail__size {
    width: 100% !important;
  }
}
</style>
