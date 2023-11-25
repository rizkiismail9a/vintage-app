<template>
  <div class="profile__card card d-flex flex-column gap-3">
    <div class="d-flex align-items-center justify-content-between">
      <span class="font-400 font-61" style="font-size: 14px">My products</span>
      <router-link to="/product/register" class="d-flex align-items-center py-2 px-3 gap-2 rounded-pill pointer add-products__button font-500 text-white">
        <i class="fa-solid fa-plus"></i>
        <p class="m-0">Add Product</p>
      </router-link>
    </div>
    <hr />
    <SimpleLoading v-if="deletingMsg">{{ deletingMsg }}</SimpleLoading>
    <SimpleLoading v-if="isGoingToEdit">Loading...</SimpleLoading>
    <div class="products__list row g-4 justify-content-between">
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="(!myProducts || myProducts.length < 1) && !isLoading">Nothing here, but us chicken</p>
      <MyProductCard v-else-if="!isLoading && myProducts.length" v-for="item in myProducts" :product="item" @delete-product="deleteThisProduct" @editProduct="editThisProduct"></MyProductCard>
    </div>
  </div>
</template>

<script setup>
import MyProductCard from "../Products/MyProductCard.vue";
import SimpleLoading from "../Loading/SimpleLoading.vue";
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../../stores/product";
import { useRouter } from "vue-router";
const productStore = useProductStore();
const isLoading = ref(true);
const myProducts = computed(() => {
  return productStore.userProducts;
});
const deletingMsg = ref("");
const isGoingToEdit = ref(false);
const router = useRouter();
onMounted(async () => {
  await productStore.finMyProduct();
  isLoading.value = false;
});
async function deleteThisProduct(productKey) {
  try {
    deletingMsg.value = "loading...";
    await productStore.deleteMyProduct(productKey);
    deletingMsg.value = "products has been deleted";
    // myProducts.splice(index, 1);
    setTimeout(() => {
      deletingMsg.value = "";
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}
async function editThisProduct(productKey) {
  isGoingToEdit.value = true;
  await productStore.findOneProduct(productKey);
  isGoingToEdit.value = false;
  router.push({ name: "Edit New Product", params: { id: productKey } });
}
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
@media screen and (max-width: 900px) {
  .profile__card {
    width: 100% !important;
  }
}
</style>
