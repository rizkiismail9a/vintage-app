<template>
  <div>
    <BaseModalTwo v-if="errorMsg">
      {{ errorMsg }}
    </BaseModalTwo>
    <SimpleLoading v-if="isLoading"> Loading... </SimpleLoading>
    <form @submit.prevent="addNewProduct">
      <div class="d-flex flex-column gap-3 font-500 font-0a">
        Product Image
        <div class="border rounded d-flex flex-column align-items-center justify-content-center p-5 w-100">
          <div v-if="temporaryLink.length" class="w-100 d-flex flex-wrap">
            <div v-for="(link, index) in temporaryLink" class="image__wrapper rounded my-3 mx-1 position-relative">
              <div class="position-absolute w-100 h-100 align-items-center justify-content-center delete-button__container">
                <i class="fa-solid fa-trash pointer" @click="deleteImages(index)" style="color: #ff0000"></i>
              </div>
              <img :src="link" width="150" height="150" class="image__preview w-100 object-fit-cover" />
            </div>
          </div>
          <label for="product__image" class="w-100 text-center">
            <i class="fa-solid fa-camera font-0a fs-1 pointer"></i>
            <input class="form-control" type="file" id="product__image" @change="createLink" multiple :accept="filePermited" hidden />
          </label>
        </div>
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
            <option value="M">S</option>
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
const filePermited = ".png, .jpg, .jpeg, .PNG, .JPG, .JPEG,";
const props = defineProps({
  isForEdit: { type: Boolean, default: false },
});
const isLoading = ref(false);
const errorMsg = ref("");
const temporaryLink = ref([]);
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
    const links = productStore.productOnDetail?.imageLink;
    let values = [];
    for (let key in links) {
      values.push(links[key]);
    }
    temporaryLink.value = values;
  }
  return;
});
const reader = (file, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = () => callback(null, fileReader.result);
  fileReader.onerror = (err) => callback(err);
  fileReader.readAsDataURL(file);
};
const createLink = (e) => {
  const { item, length, ...files } = e.target.files;
  if (!files) {
    return;
  }
  for (let key in files) {
    const maxSize = 1000000; //1 MB
    if (files[key].size > maxSize) {
      errorMsg.value = "Each file must not bigger than 1MB";
      setTimeout(() => (errorMsg.value = ""), 10000);
      return;
    }
    reader(files[key], (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      temporaryLink.value.push(result);
      productData.value.imageLink = temporaryLink.value;
    });
  }
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
function deleteImages(index) {
  return temporaryLink.value.splice(index, 1);
}
</script>
<style scoped>
.delete-button__container {
  background-color: rgba(125, 125, 125, 0.346);
  display: none;
}
.image__wrapper:hover .delete-button__container {
  display: flex;
}
</style>
