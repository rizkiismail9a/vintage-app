<template>
  <div>Ini tempat percobaan</div>

  <form @submit.prevent="changeName">
    <input type="text" v-model="name" />
  </form>
  {{ user }}
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "../stores/auth";
const name = ref("");
const authStore = useAuthStore();
const user = computed(() => {
  return authStore.getUser;
});
function changeName() {
  authStore.setUser(name.value);
}
</script>

<style scoped></style>
