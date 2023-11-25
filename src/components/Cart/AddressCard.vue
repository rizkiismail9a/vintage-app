<template>
  <div class="card address__card">
    <p style="color: #616161" class="font-400">Address</p>
    <div class="user__address border rounded d-flex gap-3 align-items-center" style="padding: 16px">
      <img src="../../assets/images/addressPinGreen.png" alt="" height="40" width="40" />
      <div>
        <p class="font-500 font-0a m-0">{{ user.fullname }}</p>
        <p style="color: #616161" class="font-400 m-0">{{ user.address }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
const user = computed(() => {
  return authStore.getUser;
});
</script>

<style scoped>
.address__card {
  padding: 20px 24px 20px 24px;
  border: 1px solid #ededed;
  border-radius: 12px;
}
</style>
