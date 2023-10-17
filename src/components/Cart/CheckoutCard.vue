<template>
  <div class="checkout__card d-flex flex-column gap-4 bg-white">
    <p style="color: #616161" class="font-400">Order</p>
    <!-- checkout__list -->
    <div class="product__info d-flex gap-4 flex-grow-1 p-0">
      <img src="../../assets/images/baju1.png" alt="gambar produk" width="48" class="object-fit-cover" height="48" />
      <div class="d-flex flex-column justify-content-between flex-grow-1">
        <div class="product__metadata m-0 flex-grow-1">
          <h1 class="m-0 font-400 product__name d-flex align-items-center justify-content-between w-100">Baju Kuning <span>1x</span></h1>
          <p class="m-0 font-400" style="font-size: 12px; letter-spacing: 0.1px; color: #404040">8/M</p>
        </div>
        <p class="my-0 font-500 font-0a">Rp200.000</p>
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
import AddressCard from "./AddressCard.vue";
import DelivaryCard from "./DelivaryCard.vue";
import PaymentCard from "./PaymentCard.vue";
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
