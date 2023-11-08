<template>
  <div class="col-6 product__card" :class="{ 'col-md-3': isOnDetail === true, 'col-md-2': isOnDetail === false }">
    <div class="d-flex flex-column row-gap-2">
      <div @click="goToDetail" class="pointer">
        <img :src="props.product.imageLink" :alt="props.product.name" class="product__image w-100" />
      </div>
      <div class="product__info d-flex flex-column">
        <h3 class="product__price font-500">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(props.product.price) }}</h3>
        <h1 class="product__name flex-grow-1 text-truncate">{{ props.product.name }}</h1>
        <div class="d-flex justify-content-between">
          <span class="product__size">{{ props.product.size }}</span>
          <span class="like__button pointer">
            <i class="fa-regular fa-heart" v-if="isLiked === false" @click="likeThePost(props.product.productKey)"></i>
            <i class="fa-solid fa-heart" style="color: red" v-else @click="dislikeThePost(props.product.productKey)"></i>
            {{ likesCounter }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRef } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useProductStore } from "../../stores/product";
const props = defineProps({
  product: { type: Object },
  isOnDetail: { type: Boolean, default: false },
});
const authStore = useAuthStore();
const productStore = useProductStore();
onMounted(() => {
  const likes = props.product.likes;
  const userId = authStore.getUser.userId;
  if (userId) {
    for (let key in likes) {
      if (likes[key].UID == userId) {
        isLiked.value = true;
      }
    }
  } else {
    isLiked.value = false;
  }
});
const router = useRouter();
function goToDetail() {
  router.push({ name: "Detail Product", params: { id: props.product.productKey } });
}
const isLiked = ref(false);
const likesCounter = computed(() => {
  const likesObject = props.product.likes;
  return likesObject === undefined ? 0 : Object.keys(likesObject).length;
});
async function likeThePost(productKey) {
  try {
    if (!authStore.getToken) {
      return router.push("/login");
    }
    isLiked.value = true;
    await productStore.likeAProduct({ productKey });
  } catch (error) {
    console.log(error);
  }
}
async function dislikeThePost(productKey) {
  // ini object
  const likes = props.product.likes;
  for (let key in likes) {
    if (likes[key].UID === authStore.getUser.userId) {
      try {
        isLiked.value = false;
        await productStore.disLikeAProduct({ productKey, likesKey: key });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style scoped>
.product__card {
  height: 300px;
}
.product__image {
  height: 200px;
  object-fit: cover;
  margin-bottom: 8px;
}
.product__price {
  font-size: 16px;
  color: #0d5054;
}
.product__name {
  font-size: 14px;
  font-weight: 400;
  color: #404040;
  height: 40px;
}
.product__size,
.like__button {
  font-size: 14px;
  color: #616161;
}
</style>
