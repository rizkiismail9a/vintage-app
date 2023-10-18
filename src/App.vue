<template>
  <div class="font-main" :class="{ 'bg-grey': routeName }">
    <router-view></router-view>
  </div>
  <!-- {{ routeName }} -->
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const routeName = computed(() => {
  const greyPage = ["/cart/checkout-card/checkout-summary", "/profile/profile-detail", "/profile/transaction-history", "/profile/edit-password"];
  const routePath = router.currentRoute?.value.path;
  if (greyPage.includes(routePath)) {
    return true;
  }
});
</script>
<style>
.bg-grey {
  background-color: #f5f5f5;
}
</style>
