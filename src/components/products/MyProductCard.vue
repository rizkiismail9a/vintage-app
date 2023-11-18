<template>
  <BaseModalOne :image-link="'/images/coffee.png'" modal-msg="Are You Sure?" sub-modal-msg="the product you've deleted, can't be restored" v-if="showModal">
    <button class="btn btn-danger" @click="deleteProduct(product.productKey)">Delete Products</button>
    <button class="btn btn-primary" @click="showModal = false">Cancel</button>
  </BaseModalOne>

  <div class="col-md-6">
    <div class="card d-flex flex-column p-3">
      <router-link :to="{ name: 'Detail Product', params: { id: product.productKey } }" class="d-flex align-items-center justify-content-between">
        <div class="product__info d-flex justify-content-between flex-column h-100 w-50">
          <p class="font-400 font-61">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price) }}</p>
          <h1 class="font-500 font-0a text-truncate w-50">{{ product.name }}</h1>
          <span class="font-500 font-61 mt-auto" style="justify-self: end">{{ new Date(product.createdAt).toLocaleDateString("en-EN", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) }}</span>
        </div>
        <img :src="product.imageLink" alt="" width="100" class="object-fit-cover" />
      </router-link>
      <hr />
      <div class="d-flex justify-content-between">
        <button class="btn btn-outline-danger" @click="showModal = true">Delete</button>
        <button class="btn btn-outline-primary" @click="editProduct(product.productKey)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseModalOne from "../Modal/BaseModalOne.vue";
import { ref } from "vue";
const props = defineProps({
  product: { type: Object },
});
const router = useRouter();
const emits = defineEmits(["deleteProduct", "editProduct"]);
const showModal = ref(false);
function deleteProduct(productKey) {
  showModal.value = false;
  emits("deleteProduct", productKey);
}
function editProduct(productKey) {
  emits("editProduct", productKey);
}
// const productStore = useProductStore();
// async function deleteProduct(key) {
//   try {
//     showModal.value = false;
//     deleting.value = "loading...";
//     await productStore.deleteMyProduct(key);
//     deleting.value = "products has been deleted";
//     setTimeout(() => {
//       deleting.value = "";
//     }, 3000);
//   } catch (error) {
//     console.log(error);
//   }
// }
</script>

<style scoped>
.product__info h1 {
  font-size: 18px;
}
</style>
