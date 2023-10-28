<template>
  <div class="login__card card font-main d-flex flex-column justify-content-between">
    <!-- title -->
    <h1 class="login__title m-0">Login to vintage</h1>
    <BaseModalTwo class="mx-4" v-if="errorMsg">{{ errorMsg }}</BaseModalTwo>
    <SimpleLoading class="mx-4" v-if="isLoading"> Loading... </SimpleLoading>
    <div class="login__form">
      <form @submit.prevent="login" class="d-flex flex-column justify-content-between">
        <p class="login__subtitle">Enter your details below</p>
        <div class="d-flex flex-column position-relative">
          <label for="email" class="font-500 mb-1">Email <span style="color: red">*</span></label>
          <input type="email" id="email" class="input__form mx-0" placeholder="Enter your email" v-model="loginData.email" />
        </div>
        <div class="d-flex flex-column position-relative">
          <label for="password" class="font-500 mb-1">Password <span style="color: red">*</span></label>
          <input type="password" id="password" class="input__form mx-0" placeholder="Enter your password" v-model="loginData.password" />
          <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 38px"></i>
        </div>
        <button class="login__button btn btn-primary">Continue</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import BaseModalTwo from "../Modal/BaseModalTwo.vue";
import SimpleLoading from "../Loading/SimpleLoading.vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const loginData = reactive({
  email: "",
  password: "",
});
const errorMsg = ref("");
const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
async function login() {
  try {
    isLoading.value = true;
    await authStore.login(loginData);
    router.push("/");
  } catch (error) {
    errorMsg.value = error;
  }
}
</script>

<style scoped>
input:focus {
  outline: 3px solid var(--vintage-main-color) !important;
}
.card {
  width: 402px;
  height: fit-content;
  box-shadow: 0px 1px 4px 0px #00000033;
}
.login__title {
  padding: 16px 24px 8px 24px;
  font-size: 18px;
  font-weight: 500;
  color: #404040;
}
.login__subtitle {
  font-size: 14px;
  color: #404040;
}
.login__form {
  padding: 16px 24px 8px 24px;
}
.input__form {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 12px 8px 12px;
  margin-bottom: 24px;
}
label {
  font-size: 14px;
}
.login__button {
  margin: 16px 0 24px 0;
}
</style>
