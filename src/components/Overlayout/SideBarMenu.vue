<template>
  <Teleport to="body">
    <Transition name="content" appear>
      <div v-if="isSidebarActive" class="sidebar__content d-flex flex-column align-items-start position-fixed">
        <div class="sidebar__title mb-4 w-100 d-flex justify-content-between align-items-center">
          <h1 class="font-0a font-500" style="font-size: 24px">Filter</h1>
          <i class="fa-solid fa-xmark pointer" style="font-size: 18px" @click="hideMe"></i>
        </div>
        <div class="sorting__price mb-4">
          <h3 class="font-0a font-500" style="font-size: 18px">Sort by price</h3>
          <div class="d-flex filter-menu__button gap-2">
            <div class="card p-3 pointer font-400 font-40" style="font-size: 14px" @click="sortByPrice('ascending')">Ascending</div>
            <div class="card p-3 pointer font-400 font-40" style="font-size: 14px" @click="sortByPrice('descending')">Descending</div>
          </div>
        </div>
        <div class="price__range mb-4">
          <h3 class="font-0a font-500" style="font-size: 18px">Price range</h3>
          <div class="input__price-range d-flex gap-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Rp</span>
              <input type="number" style="font-size: 14px" class="form-control" placeholder="lowest price" v-model="lowestPrice" @keyup="priceRange(lowestPrice, highestPrice, 'manual')" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Rp</span>
              <input type="number" class="form-control" placeholder="highest price" v-model="highestPrice" style="font-size: 14px" @keyup="priceRange(lowestPrice, highestPrice, 'manual')" />
            </div>
          </div>
          <div class="d-flex filter-menu__button gap-2">
            <div class="card p-3 pointer font-400 font-40" style="font-size: 14px" @click="priceRange(50000, 100000, 'auto')">Rp50k - Rp100k</div>
            <div class="card p-3 pointer font-400 font-40" style="font-size: 14px" @click="priceRange(100000, 1000000, 'auto')">Rp100k - Rp1000k</div>
            <div class="card p-3 pointer font-400 font-40" style="font-size: 14px" @click="priceRange(1000000, null, 'auto')">> Rp1000k</div>
          </div>
        </div>
        <div class="size mb-4">
          <h3 class="font-0a font-500" style="font-size: 18px">Product size</h3>
          <div class="d-flex filter-menu__button gap-2">
            <div v-for="(size, index) in sizes" :key="index" class="pointer card p-3 font-400 font-40" @click="sizeRange(size)" style="font-size: 14px">{{ size }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "../../stores/product";
const sizes = ["M", "L", "S", "XL", "XXL"];
const emits = defineEmits(["hideSidebar", "filterByPrice", "filterBySize", "sortByPrice"]);
defineProps({
  isSidebarActive: { type: Boolean, default: false },
});
const productStore = useProductStore();
function hideMe() {
  emits("hideSidebar");
}
const lowestPrice = ref("");
const highestPrice = ref("");
function priceRange(startAt, endAt, mode) {
  if (mode === "manual") {
    emits("filterByPrice", { startAt: lowestPrice.value, endAt: highestPrice.value, mode });
  } else {
    emits("filterByPrice", { startAt, endAt, mode });
  }
}
function sizeRange(size) {
  emits("filterBySize", size);
}
function sortByPrice(mode) {
  emits("sortByPrice", mode);
}
</script>

<style scoped>
.sidebar__content {
  width: 485px;
  padding-top: 88px;
  padding: 88px 24px 24px 24px;
  background-color: white;
  box-shadow: 0 10px 8px 6px rgba(80, 80, 80, 0.113);
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 50;
}
.filter-menu__button {
  flex-wrap: wrap;
}
.content-enter-active,
.content-leave-active {
  transition: all 0.6s linear;
}

.content-enter-from {
  opacity: 0;
  transform: translateX(-1000px);
}
.content-leave-to {
  opacity: 0;
  transform: translateX(-1000px) !important;
}
.container-enter-active,
.container-leave-active {
  transition: all 0.6s;
}

.container-enter-from,
.container-leave-to {
  opacity: 0;
}
@media screen and (max-width: 768px) {
  .sidebar__content {
    padding-top: 130px;
  }
}
</style>
