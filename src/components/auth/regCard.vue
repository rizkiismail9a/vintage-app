<template>
  <base-modal-one v-if="showModal" :image-link="'src/assets/images/regModal.png'" :modal-msg="'Successfully Register'" :sub-modal-msg="'Thank you for register at vintage. Start find your favorite pre-loved product here.'">
    <router-link to="/" class="btn btn-primary w-100">Go to Home Page</router-link>
  </base-modal-one>
  <div class="register__card card font-main d-flex flex-column justify-content-between">
    <!-- title -->
    <h1 class="register__title m-0 d-flex justify-content-between"><span>Sign up</span> <i class="fa-solid fa-xmark"></i></h1>
    <BaseModalTwo class="mx-4" v-if="errorMsg">{{ errorMsg }}</BaseModalTwo>
    <SimpleLoading v-if="isLoading">Loading...</SimpleLoading>
    <div class="register__form">
      <form @submit.prevent="register" class="d-flex flex-column justify-content-between">
        <p class="register__subtitle">Enter your details below</p>
        <!-- full name -->
        <div class="d-flex flex-column position-relative">
          <label for="fullName" class="font-500 mb-1">Full name <span style="color: red">*</span></label>
          <input type="text" id="fullName" class="input__form mx-0" placeholder="Enter your fullname" v-model="newData.fullname" />
        </div>
        <!-- username -->
        <div class="d-flex flex-column position-relative">
          <label for="username" class="font-500 mb-1">Username <span style="color: red">*</span></label>
          <input type="text" id="username" class="input__form mx-0" placeholder="Enter your username" v-model="newData.username" />
        </div>
        <!-- email -->
        <div class="d-flex flex-column position-relative">
          <label for="email" class="font-500 mb-1">Email <span style="color: red">*</span></label>
          <input type="email" id="email" class="input__form mx-0" placeholder="Enter your email" v-model="newData.email" />
        </div>
        <!-- password -->
        <div class="d-flex flex-column position-relative">
          <label for="password" class="font-500 mb-1">Password <span style="color: red">*</span></label>
          <input type="password" id="password" class="input__form mx-0" placeholder="Enter your password" v-model="newData.password" />
          <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 38px"></i>
        </div>
        <!-- password -->
        <div class="d-flex flex-column position-relative">
          <label for="passwordConfirm" class="font-500 mb-1">Confirmation Password <span style="color: red">*</span></label>
          <input type="password" id="passwordConfirm" class="input__form mx-0" placeholder="Enter your password" v-model="newData.passwordConfirm" />
          <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 38px"></i>
        </div>
        <!-- checkbox -->
        <div class="d-flex gap-2 agreement d-flex align-items-start">
          <label class="checkbox__wrapper">
            <input type="checkbox" v-model="newData.agreement" />
            <span class="checkmark"></span>
          </label>
          <p class="m-0 font-400">
            By clicking sign up, I hereby agree and consent to <span style="color: var(--vintage-main-color)"> Term & Conditions </span>; I confirm that I have read <span style="color: var(--vintage-main-color)">Privacy policy</span>.
          </p>
        </div>
        <button class="register__button btn btn-primary">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseModalOne from "../../components/Modal/BaseModalOne.vue";
import BaseModalTwo from "../Modal/BaseModalTwo.vue";
import SimpleLoading from "../Loading/SimpleLoading.vue";
import { useAuthStore } from "../../stores/auth";
import { reactive, ref } from "vue";
const authStore = useAuthStore();
const showModal = ref(false);
const errorMsg = ref("");
const isLoading = ref(false);
const newData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  agreement: false,
});
async function register() {
  if (!newData.fullname || !newData.username || !newData.email || !newData.password) {
    return (errorMsg.value = "Please fill out the form");
  }
  if (newData.password !== newData.passwordConfirm) {
    return (errorMsg.value = "Password confirm doesn't match");
  }
  if (newData.agreement === false) {
    return (errorMsg.value = "Please click the checkbox");
  }
  try {
    isLoading.value = true;
    await authStore.regitster(newData);
    isLoading.value = false;
    showModal.value = true;
  } catch (error) {
    errorMsg.value = error;
  }
}
</script>

<style scoped>
input:focus {
  outline: 3px solid var(--vintage-main-color) !important;
}
.checkbox__wrapper {
  display: block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox__wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 5px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border: none;
  border-radius: 6px;
}

/* On mouse-over, add a grey background color */
.checkbox__wrapper:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox__wrapper input:checked ~ .checkmark {
  background-color: var(--vintage-main-color);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox__wrapper input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox__wrapper .checkmark:after {
  left: 7px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.card {
  width: 450px;
  height: fit-content;
  box-shadow: 0px 1px 4px 0px #00000033;
  margin-top: 110px;
  margin-bottom: 50px;
}
.register__title {
  padding: 16px 24px 8px 24px;
  font-size: 18px;
  font-weight: 500;
  color: #404040;
}
.register__subtitle {
  font-size: 14px;
  color: #404040;
}
.register__form {
  padding: 16px 24px 8px 24px;
}
.input__form {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 12px 8px 12px;
  margin-bottom: 24px;
  font-size: 16px;
}
label {
  font-size: 14px;
}
.register__button {
  margin: 16px 0 24px 0;
}
.agreement {
  width: 343px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  color: #404040;
}
/* .agreement input {
  width: 20px;
  height: 20px;
} */
</style>
