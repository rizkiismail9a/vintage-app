<template>
  <NavbarComponent></NavbarComponent>
  <div class="profile__wrapper container mx-auto row gx-4">
    <!-- setting -->
    <div class="setting d-flex flex-column justify-content-between col-md-3">
      <setting-card></setting-card>
    </div>
    <!-- profile info card -->
    <div class="col-md-9">
      <Transition>
        <component :is="component[getParams]"></component>
      </Transition>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import FooterComponent from "../components/Footer/FooterComponent.vue";
import SettingCard from "../components/Profile/SettingCard.vue";
import ProfileDetail from "../components/Profile/ProfileDetail.vue";
import EditPassword from "../components/Profile/EditPassword.vue";
import TransactionHistory from "../components/Profile/TransactionHistory.vue";
import MyProducts from "../components/Profile/MyProducts.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const component = {
  "profile-detail": ProfileDetail,
  "edit-password": EditPassword,
  "transaction-history": TransactionHistory,
  "my-products": MyProducts,
};
const getParams = computed(() => {
  return route.params.component;
});
</script>

<style scoped>
.profile__wrapper {
  padding-top: 88px;
  margin-bottom: 50px;
  min-height: 100vh;
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.7s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
