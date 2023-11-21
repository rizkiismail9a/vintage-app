<template>
  <!-- <SimpleNavbar></SimpleNavbar> -->
  <div class="product__form container mx-auto pb-4">
    <div class="title">
      <h1 class="font-500 font-0a">Add New Product</h1>
    </div>
    <div class="card border p-4">
      <product-form></product-form>
    </div>
  </div>
</template>

<script setup>
import SimpleNavbar from "../components/Navbar/SimpleNavbar.vue";
import ProductForm from "../components/Products/ProductForm.vue";
</script>

<style scoped>
.product__form {
  padding-top: 88px;
}
.title h1 {
  font-size: 24px;
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .product__form {
    padding-top: 150px;
  }
}
</style>
