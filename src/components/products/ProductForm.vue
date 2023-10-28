<template>
  <div>
    <form>
      <div class="d-flex flex-column gap-3">
        <label for="product__image" class="w-100 font-500 font-0a">
          Product Image
          <input class="form-control" type="file" id="product__image" />
        </label>
        <label for="product__name" class="w-100 font-500 font-0a">
          Product Name
          <input type="text" class="form-control" id="product__name" placeholder="Add your product name" />
        </label>
        <label for="product__price" class="w-100 font-500 font-0a">
          Product Price
          <input type="number" class="form-control" id="product__price" placeholder="Add your product price" />
        </label>
      </div>
      <hr class="my-4" />
      <div class="d-flex flex-column gap-3">
        <label for="product__size" class="w-100 font-500 font-0a">
          Product Size
          <select class="form-select" aria-label="Default select example">
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
          </select>
        </label>

        <label for="product__quality" class="w-100 font-500 font-0a">
          Product Quality
          <input type="text" class="form-control" id="product__quality" placeholder="Ex: As good as new" />
        </label>
        <div class="mb-3">
          <label for="product__description" class="form-label">Product Description</label>
          <textarea class="form-control" id="product__description" rows="3"></textarea>
        </div>
      </div>
      <hr class="my-4" />
      <button v-if="!props.isForEdit" class="btn btn-primary" type="submit">Submit Product</button>
      <button v-else class="btn btn-primary" type="submit">Edit Product</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  isForEdit: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped></style>
