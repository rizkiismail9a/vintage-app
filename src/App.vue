<template>
  <NavbarComponent v-if="routeName"></NavbarComponent>
  <SimpleNavbar v-else></SimpleNavbar>
  <div class="font-main" :class="{ 'bg-grey': routePath }">
    <!-- router key diperlukan untuk melakukan force replacement /  rerender halaman setiap kali router berpindah -->
    <router-view :key="$route.fullPath"></router-view>
  </div>
  <!-- {{ routeName }} -->
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import NavbarComponent from "./components/Navbar/NavbarComponent.vue";
import SimpleNavbar from "@/components/Navbar/SimpleNavbar.vue";
const router = useRouter();
const route = useRoute();
onMounted(() => {
  if (route.fullPath !== "/cart/checkout-card/checkout-summary") {
    localStorage.removeItem("buyNow");
    localStorage.removeItem("buyAgain");
  }
});
const routePath = computed(() => {
  const greyPage = ["/cart/checkout-card/checkout-summary", "/profile/profile-detail", "/profile/transaction-history", "/profile/edit-password"];
  const currentPath = router.currentRoute?.value.path;
  if (greyPage.includes(currentPath)) {
    return true;
  }
});
const routeName = computed(() => {
  const useSimpleNavbar = ["Add New Product", "Login", "Edit New Product", "Sign Up"];
  const currentPathName = route.name;
  if (useSimpleNavbar.includes(currentPathName)) {
    return false;
  } else {
    return true;
  }
});
</script>
<style>
.bg-grey {
  background-color: #f5f5f5;
}
</style>
