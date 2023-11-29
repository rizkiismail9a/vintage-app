<template>
  <div class="products__wrapper products__404 row gx-4 gy-5">
    <div class="col-12 d-flex justify-content-center align-items-center">
      <div class="card border-0 products__404-card d-flex flex-column align-items-center gap-4">
        <img :src="props.imageLink" alt="tas" width="140" height="140" />
        <div class="text-center d-flex flex-column align-items-center">
          <p class="font-0a font-500 m-0 width-343" style="font-size: 28px">{{ props.popMessage }}</p>
          <span class="font-400 font-40 width-343" :class="{ 'width-745': isOnHistory }" style="font-size: 16px">{{ props.subMessage }}</span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageLink: { type: String },
  popMessage: { type: String },
  subMessage: { type: String },
  isOnHistory: { type: Boolean, default: false },
});
</script>

<style scoped>
.products__wrapper {
  margin: 24px 0 72px 0;
}
.width-343 {
  width: 343px;
}
.width-745 {
  width: 745px !important;
}
</style>
