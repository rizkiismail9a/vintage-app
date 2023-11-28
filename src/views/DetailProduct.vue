<template>
  <base-modal-one
    @closeModal="showModal = false"
    v-if="showModal"
    image-link="/images/cartModal.gif"
    modal-msg="Product successfully added to cart"
    :sub-modal-msg="'“Vintage chicago cubs white” successfully added to cart. Check now on the cart or continue shopping.'"
  >
    <button class="btn btn-outline-primary" @click="showModal = false">Continue shopping</button>
    <router-link to="/cart/cart-product-card/cart-summary" class="btn btn-primary">Go to cart</router-link>
  </base-modal-one>
  <div v-if="isLoading" class="detail__wrapper d-flex justify-content-center align-items-center h-100">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <!-- detail wrapper  -->
  <div v-else class="detail__wrapper container mx-auto">
    <!-- images and product information -->
    <div class="row gx-3 flex-column flex-md-row detail-card__and__image">
      <!-- product images -->
      <div class="col-md-8">
        <!-- <img class="detail__image w-100 object-fit-cover" :src="images[0]" alt="product name" /> -->
        <!-- big picture -->
        <swiper
          :style="{
            '--swiper-navigation-color': '#009499',
          }"
          :loop="true"
          :thumbs="{
            swiper: thumbnails,
          }"
          :space-between="10"
          :navigation="true"
          :modules="modules"
          class="mySwiper2 mb-3"
        >
          <swiper-slide v-for="link in images" :key="link">
            <img :src="link" />
          </swiper-slide>
        </swiper>
        <!-- thumbnails -->
        <swiper
          @swiper="setThumbsSwiper"
          :loop="true"
          :space-between="10"
          :pagination="true"
          :freeMode="true"
          :slides-per-view="3"
          :watch-slides-progress="true"
          :modules="modules"
          class="mySwiper"
          :breakpoints="{ 900: { slidesPerView: 5 } }"
        >
          <swiper-slide v-for="link in images" :key="link">
            <img :src="link" alt="" class="h-100 pointer" />
          </swiper-slide>
        </swiper>
      </div>
      <!-- product information -->
      <div class="col-md-4">
        <detail-information-card @addToCart="addToCart" @buyNow="buyNow"></detail-information-card>
      </div>
    </div>
    <!-- other product list -->
    <div class="other__product d-flex flex-column w-100 mt-3">
      <div class="products__title d-flex flex-row justify-content-between align-items-center">
        <h2 class="font-500" style="font-size: 24px">Other Products</h2>
      </div>
      <div class="row gx-3">
        <div class="col-md-8">
          <div class="row gy-5">
            <product-card :is-on-detail="true" v-for="p in relatedProduct" :product="p"></product-card>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent></FooterComponent>
</template>

<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { computed, onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, FreeMode, Thumbs, Pagination } from "swiper/modules";
import LoadingSpinner from "../components/Loading/LoadingSpinner.vue";
import ProductCard from "../components/Products/ProductCard.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import DetailInformationCard from "../components/Detail/DetailInformationCard.vue";
import BaseModalOne from "../components/Modal/BaseModalOne.vue";
import { useProductStore } from "../stores/product";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const showModal = ref(false);
const authStore = useAuthStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const modules = [Navigation, FreeMode, Thumbs, Pagination];
const thumbnails = ref("");
onMounted(async () => {
  isLoading.value = true;
  await productStore.findOneProduct(route.params.id);
  await productStore.findRelatedProduct();
  const swiperEl = document.querySelector(".mySwiper");
  thumbnails.value = swiperEl;
  isLoading.value = false;
});
function setThumbsSwiper(swiper) {
  thumbnails.value = swiper;
}
const images = computed(() => {
  return productStore.getImagesLink;
});
const relatedProduct = computed(() => {
  const data = productStore.getRelatedProducts;
  return data.filter((item) => item.productKey !== route.params.id);
});
async function addToCart() {
  if (!authStore.getLogin) {
    return router.push("/login");
  }
  try {
    await productStore.addToCart(route.params.id);
    showModal.value = true;
  } catch (error) {
    console.log(error);
  }
}
async function buyNow() {
  if (!authStore.getLogin) {
    return router.push("/login");
  }
  try {
    await productStore.buyTheProductNow(route.params.id);
    router.push("/cart/checkout-card/checkout-summary");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.detail__wrapper {
  padding-top: 104px;
  margin-bottom: 140px;
  min-height: 100vh;
}
.detail__image {
  margin-bottom: 40px;
}
.products__title {
  margin-bottom: 24px;
}
/* style 1 */
.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mySwiper2 {
  height: 500px;
  width: 100%;
}

.mySwiper {
  height: fit-content;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: fit-content;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}
.mySwiper2 .swiper-slide img {
  display: block;
  height: 100%;
  object-fit: contain;
}
.mySwiper .swiper-slide img {
  display: block;
  width: 100%;
  object-fit: cover;
}
@media screen and (max-width: 900px) {
  .detail__wrapper {
    padding-top: 120px;
    margin-bottom: 140px;
    min-height: 100vh;
  }
  .other__product {
    width: 100% !important;
  }
  .mySwiper2 {
    height: 300px;
    width: 100%;
  }
  .mySwiper2 .swiper-slide img {
    width: 100%;
  }
  .detail-card__and__image {
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
