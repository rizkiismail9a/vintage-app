<template>
  <div>
    <BaseModalTwo v-if="errorMsg">
      {{ errorMsg }}
    </BaseModalTwo>
    <SimpleLoading v-if="isLoading"> Loading... </SimpleLoading>
    <form @submit.prevent="addNewProduct">
      <div class="d-flex flex-column gap-3">
        <label for="product__image" class="w-100 font-500 font-0a">
          Product Image
          <input class="form-control" type="file" id="product__image" @change="createLink" />
          <img v-if="temporaryLink" :src="temporaryLink" width="150" height="150" class="rounded my-3 object-fit-cover" />
        </label>
        <label for="product__name" class="w-100 font-500 font-0a">
          Product Name
          <input type="text" class="form-control" id="product__name" placeholder="Add your product name" v-model="productData.name" />
        </label>
        <label for="product__name" class="w-100 font-500 font-0a">
          Product Brand
          <input type="text" class="form-control" id="product__name" placeholder="Add your brand name" v-model="productData.brand" />
        </label>
        <label for="product__cetagory" class="w-100 font-500 font-0a">
          Product Cetaogry
          <input type="text" class="form-control" id="product__cetagory" placeholder="Add your product name" v-model="productData.cetagory" />
        </label>
        <label for="product__price" class="w-100 font-500 font-0a">
          Product Price
          <input type="number" class="form-control" id="product__price" placeholder="Add your product price; Please input number only; Ex: 76000" v-model.number="productData.price" />
        </label>
      </div>
      <hr class="my-4" />
      <div class="d-flex flex-column gap-3">
        <label for="product__size" class="w-100 font-500 font-0a">
          Product Size
          <select class="form-select" aria-label="Default select example" v-model="productData.size">
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
          </select>
        </label>

        <label for="product__quality" class="w-100 font-500 font-0a">
          Product Quality
          <input type="text" class="form-control" id="product__quality" placeholder="Ex: As good as new" v-model="productData.quality" />
        </label>
        <div class="mb-3">
          <label for="product__description" class="form-label">Product Description</label>
          <textarea class="form-control" id="product__description" rows="3" v-model="productData.description"></textarea>
        </div>
      </div>
      <hr class="my-4" />
      <button v-if="!props.isForEdit" class="btn btn-primary" type="submit">Submit Product</button>
      <button v-else class="btn btn-primary" type="submit">Edit Product</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseModalTwo from "../Modal/BaseModalTwo.vue";
import SimpleLoading from "../Loading/SimpleLoading.vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../stores/product";

const props = defineProps({
  isForEdit: { type: Boolean, default: false },
});
const isLoading = ref(false);
const errorMsg = ref("");
const temporaryLink = ref("");
const productStore = useProductStore();
const productData = ref({
  imageLink: "",
  name: "",
  price: "",
  size: "M",
  quality: "",
  description: "",
  cetagory: "",
  brand: "",
});
onMounted(async () => {
  if (props.isForEdit) {
    productData.value = {};
    productData.value = productStore.productOnDetail;
    temporaryLink.value = productStore.productOnDetail.imageLink;
  }
});
const createLink = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    temporaryLink.value = reader.result;
    productData.value.imageLink = reader.result;
  });
};
const router = useRouter();
const route = useRoute();
async function addNewProduct() {
  if (!props.isForEdit) {
    try {
      isLoading.value = true;
      await productStore.addNewProduct(productData.value);
      router.push("/profile/my-products");
    } catch (error) {
      isLoading.value = false;
      errorMsg.value = error;
    }
  } else {
    try {
      isLoading.value = true;
      await productStore.editProduct({ product: productData.value, id: route.params.id });
      router.push("/profile/my-products");
    } catch (error) {
      isLoading.value = false;
      errorMsg.value = error;
    }
  }
}
</script>
