<template>
  <div class="profile__card card d-flex flex-column gap-3">
    <BaseModalTwo v-if="errorMsg">{{ errorMsg }}</BaseModalTwo>
    <SimpleLoading v-if="isLoading">{{ isLoading }}</SimpleLoading>
    <div class="d-flex align-items-center justify-content-between">
      <span class="font-400 font-61" style="font-size: 14px">My products</span>
      <router-link to="/product/register" class="d-flex align-items-center py-2 px-3 gap-2 rounded-pill pointer add-products__button font-500 text-white">
        <i class="fa-solid fa-plus"></i>
        <p class="m-0">Add Product</p>
      </router-link>
    </div>
    <hr />
    <div class="products__list row g-4 justify-content-between">
      <MyProductCard></MyProductCard>
    </div>
  </div>
</template>

<script setup>
import BaseModalTwo from "../Modal/BaseModalTwo.vue";
import SimpleLoading from "../Loading/SimpleLoading.vue";
import MyProductCard from "../Products/MyProductCard.vue";
import { computed, ref, reactive } from "vue";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
const errorMsg = ref("");

const isLoading = ref("");
</script>

<style scoped>
.profile__card {
  width: 870px;
  padding: 20px 24px 20px 24px;
  border: 1px solid #ededed;
}
.add-products__button {
  background-color: #009499;
}
</style>
