<template>
  <div class="address mx-4 d-flex gap-3 align-items-center p-0">
    <img src="../../assets/images/addressPin.png" alt="address pin" width="16" />
    <p class="m-0" style="color: #404040">Shipping to <b style="color: #0a0a0a">Cianjur, Jawa Barat</b></p>
  </div>
  <div class="cart__product-card bg-white d-flex flex-column gap-4">
    <div class="product__info d-flex gap-4 flex-grow-1">
      <img src="../../assets/images/baju1.png" alt="gambar produk" width="80" class="object-fit-cover" height="80" />
      <div class="d-flex flex-column justify-content-between">
        <div class="product__metadata m-0 flex-grow-1">
          <p class="m-0 font-400 product__name">Baju Kuning</p>
          <p class="m-0 font-400" style="font-size: 12px; letter-spacing: 0.1px; color: #404040">8/M</p>
        </div>
        <p class="my-0 font-500" style="font-size: 14px; color: #0a0a0a">Rp200.000</p>
      </div>
    </div>
    <div class="product__action d-flex justify-content-between align-items-center">
      <p class="remove my-0 font-500" style="color: #cb3a31; cursor: pointer">Remove</p>
      <div class="amount border rounded d-flex align-items-center justify-content-evenly font-500" style="color: #404040">
        <span class="d-block text-center" style="width: 32px; height: 32px; padding-top: 4px; border-right: 1px solid #ededed; cursor: pointer">-</span>
        <input type="number" class="d-block text-center" style="width: 32px; height: 32px; padding-top: 4px; border: none" value="1" />
        <span class="d-block text-center" style="width: 32px; height: 32px; padding-top: 4px; border-left: 1px solid #ededed; cursor: pointer">+</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
</style>
