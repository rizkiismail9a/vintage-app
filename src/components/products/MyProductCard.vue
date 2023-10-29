<template>
  <BaseModalOne :image-link="'/images/coffee.png'" modal-msg="Are You Sure?" sub-modal-msg="the product you've deleted, can be restored" v-if="showModal">
    <button class="btn btn-danger" @click="deleteProduct(product.key)">Delete Products</button>
  </BaseModalOne>
  <div class="col-md-6">
    <div class="card d-flex flex-column p-3">
      <div class="d-flex align-items-center justify-content-between">
        <div class="product__info d-flex justify-content-between flex-column h-100">
          <p class="font-400 font-61">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price) }}</p>
          <h1 class="font-500 font-0a">{{ product.name }}</h1>
          <span class="font-500 font-61 mt-auto" style="justify-self: end">{{ product.createdAt }}</span>
        </div>
        <img :src="product.imageLink" alt="" width="100" class="object-fit-cover" />
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <button class="btn btn-outline-danger" @click="showModal = true">Delete</button>
        <button class="btn btn-outline-primary">Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseModalOne from "../Modal/BaseModalOne.vue";
import { ref } from "vue";
const props = defineProps({
  product: { type: Object },
});
const emits = defineEmits(["deleteProduct"]);
const showModal = ref(false);
function deleteProduct(key) {
  showModal.value = false;
  emits("deleteProduct", key);
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
