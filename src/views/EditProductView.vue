<template>
  <SimpleNavbar></SimpleNavbar>
  <div class="product__form container mx-auto pb-4">
    <div class="title">
      <h1 class="font-500 font-0a">Add New Product</h1>
    </div>
    <div class="card border p-4">
      <product-form :is-for-edit="true"></product-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import SimpleNavbar from "../components/Navbar/SimpleNavbar.vue";
import ProductForm from "../components/Products/ProductForm.vue";
import { useProductStore } from "../stores/product";
import { useRoute } from "vue-router";

const productStore = useProductStore();
const route = useRoute();
onMounted(async () => {
  await productStore.findOneProduct(route.params.id);
});
</script>

<style scoped>
.product__form {
  margin-top: 88px;
}
.title h1 {
  font-size: 24px;
  margin-bottom: 18px;
}
</style>
