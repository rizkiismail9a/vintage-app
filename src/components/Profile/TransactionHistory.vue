<template>
  <div class="profile__card card d-flex flex-column gap-3">
    <span class="font-400 font-61" style="font-size: 14px">My Order</span>
    <!-- product__card looping start here-->
    <div v-if="false">
      <TransactionHistoryCard></TransactionHistoryCard>
    </div>
    <div>
      <ProductNotFound :is-on-history="true" image-link="/images/bag-2.png" pop-message="No orders yet" sub-message="When you buy an item, your order about it will appear here.">
        <router-link class="btn btn-primary" style="width: 234px" to="/collection">Shop now</router-link>
      </ProductNotFound>
    </div>
  </div>
</template>

<script setup>
import TransactionHistoryCard from "../Products/TransactionHistoryCard.vue";
import ProductNotFound from "../Products/ProductNotFound.vue";
</script>

<style scoped>
.profile__card {
  width: 793px;
  padding: 20px 24px 20px 24px;
  border: 1px solid #ededed;
}
</style>
