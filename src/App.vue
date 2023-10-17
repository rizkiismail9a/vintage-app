<template>
  <div class="font-main" :class="{ 'bg-grey': routeName === '/cart/checkout-card/checkout-summary' }">
    <router-view></router-view>
  </div>
  <!-- {{ routeName }} -->
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const routeName = computed(() => {
  return router.currentRoute?.value.path;
});
</script>
<style>
.bg-grey {
  background-color: #f5f5f5;
}
</style>
