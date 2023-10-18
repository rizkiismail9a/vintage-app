<template>
  <div class="products__wrapper products__404 row gx-4 gy-5">
    <div class="col-12 d-flex justify-content-center align-items-center">
      <div class="card border-0 products__404-card d-flex flex-column align-items-center gap-4">
        <img :src="props.imageLink" alt="tas" width="140" height="140" />
        <div class="text-center">
          <p class="font-0a font-500 m-0" style="font-size: 28px">{{ props.popMessage }}</p>
          <span class="font-400" style="font-size: 16px; color: #404040">{{ props.subMessage }}</span>
        </div>
        <button class="btn btn-primary" style="width: 234px">{{ props.buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageLink: { type: String },
  popMessage: { type: String },
  subMessage: { type: String },
  buttonText: { type: String },
});
</script>

<style scoped>
.products__wrapper {
  margin: 24px 0 72px 0;
}
.products__404-card {
  width: 343px;
}
</style>
