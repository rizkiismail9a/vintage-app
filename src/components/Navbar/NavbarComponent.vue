<template>
  <base-modal-three v-if="wannaLogout" modal-msg="Logout" sub-modal-msg="Are you sure want to logout from vintage?">
    <button class="btn btn__close" @click="wannaLogout = !wannaLogout">Close</button>
    <button class="btn btn-danger" @click="logout">Logout</button>
  </base-modal-three>
  <div class="navbar font-main fixed-top bg-white">
    <div class="container navbar__container d-flex flex-md-row flex-column">
      <!-- logo -->
      <router-link to="/"><img src="../../assets/images/logo.png" alt="vintage logo" class="navbar__logo" /></router-link>
      <!-- hamburger button -->
      <i class="fa-solid fa-bars fs-1 d-block d-md-none hamburger_btn mb-4" @click="showNavbar = !showNavbar"></i>
      <div class="nav-collapse d-flex flex-md-row flex-column align-items-center flex-grow-1" :class="{ toggle: showNavbar }">
        <!-- search form -->
        <form @submit.prevent="$emit('search', keyword)" class="d-flex navbar__form flex-grow-1 align-items-center position-relative" role="search">
          <i class="fa-solid fa-magnifying-glass fs-5 px-2 position-absolute"></i>
          <label for="searchProduct" class="form-label flex-grow-1 m-0 w-100">
            <input type="text" class="form-control ps-5" id="searchProduct" aria-describedby="emailHelp" @click="goToCollection" autofocus v-model="keyword" placeholder="Search for items" />
          </label>
          <div class="mb-3"></div>
        </form>
        <!-- auth menu -->
        <div v-if="!isLogin" class="d-flex navbar__auth justify-content-between align-items-center">
          <router-link to="/login" class="btn btn-outline-primary btn-login">Login</router-link>
          <router-link to="/signup" class="btn btn-primary btn-signup">Signup</router-link>
        </div>
        <div v-else class="d-flex gap-4 navbar__auth justify-content-between align-items-center">
          <div class="d-flex flex-grow-1 gap-3">
            <div class="position-relative p-0">
              <img src="../../assets/images/cart.png" width="36" height="36" />
              <span class="notification__count rounded-circle position-absolute text-white pb-1">1</span>
            </div>
            <div class="position-relative p-0">
              <img src="../../assets/images/heart.png" width="36" height="36" />
              <span class="notification__count rounded-circle position-absolute text-white pb-1">1</span>
            </div>
          </div>
          <!-- profile foto -->
          <div class="d-flex align-items-center gap-1 position-relative">
            <img v-if="user.imageLink" src="../../assets/images/user1.png" width="40" height="40" />
            <i v-else class="fa-solid fa-user fs-4"></i>
            <i @click="wannaGoToProfile = !wannaGoToProfile" class="fa-solid fa-chevron-down font-40 font-75 pointer" style="margin-left: 8px"></i>
            <div v-if="wannaGoToProfile" class="card d-flex flex-column position-absolute profile__dropdown gap-3 p-1">
              <span class="font-400 font-40 px-2 py-2 pointer"><img class="me-2" src="../../assets/images/person.png" />Profile</span>
              <span class="font-400 font-40 px-2 pointer"><img class="me-2" src="../../assets/images/receipt.png" />Order</span>
              <span class="font-400 px-2 py-2 pointer border-top" @click="wannaLogout = true"><img class="me-2" src="../../assets/images/exit.png" />Logout</span>
            </div>
          </div>
        </div>
        <div class="language font-40 border-start">EN<i class="fa-solid fa-chevron-down font-75" style="margin-left: 8px"></i></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseModalThree from "../Modal/BaseModalThree.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
const showNavbar = ref(false);
const wannaLogout = ref(false);
const router = useRouter();
const emits = defineEmits(["goToCollection"]);
const props = defineProps({
  isAtCollection: { type: Boolean, default: false },
});
const keyword = ref("");
const wannaGoToProfile = ref(false);
const authStore = useAuthStore();
function goToCollection() {
  if (!props.isAtCollection) {
    router.push("/collection");
  }
}
const user = computed(() => {
  return authStore.getUser;
});
const isLogin = computed(() => {
  return authStore.getLogin;
});
async function logout() {
  wannaLogout.value = true;
  await authStore.logout();
  wannaLogout.value = false;
  router.push("/");
}
</script>

<style scoped>
input:focus {
  outline: 3px solid var(--vintage-main-color) !important;
}
.navbar__form input {
  border-right: 1px solid #ededed;
}
.navbar__form {
  border: 1px solid #ededed;
  border-radius: 8px;
  color: #757575;
  font-size: 14px;
}
.navbar__form input {
  border-right: 1px solid #ededed;
}
.notification__count {
  text-align: center;
  width: 20px;
  height: 20px;
  background-color: #cb3a31;
  top: 0;
  right: 0.1px;
}
.profile__dropdown {
  top: 58px;
  width: 200px;
  /* padding: 4px 0px 4px 0px; */
  font-size: 14px;
}
.profile__dropdown:nth-child(3) {
  color: #cb3a31;
}
.btn__close {
  background-color: #ededed;
  padding: 8px 12px 8px 12px;
  box-shadow: 0px 1px 3px 0px #1018281a;
  box-shadow: 0px 1px 2px 0px #1018280f;
}
.btn__danger {
  box-shadow: 0px 1px 3px 0px #1018281a;
  background-color: #cb3a31;
}
@media screen and (min-width: 992px) {
  .navbar {
    padding: 12px 120px 12px 120px;
  }
  .nav-collapse {
    flex-basis: 0 !important;
  }
  .navbar__logo,
  .navbar__form {
    margin-right: 32px;
  }

  .btn {
    width: 83px !important;
    height: 36px !important;
  }
  .btn-login {
    margin-right: 16px !important;
  }
  .language {
    padding-left: 27px;
    margin-left: 27px;
  }
}
@media screen and (max-width: 990px) {
  .navbar__logo,
  .navbar__form,
  .navbar__auth,
  .language {
    margin-bottom: 12px;
  }
  .nav-collapse {
    width: 100%;
    position: absolute;
    top: 100px;
    right: -1000px;
    background-color: white;
    transition: all 0.3s ease-in-out;
    z-index: 40;
  }
  div .navbar__form {
    width: 100%;
    padding: 0 12px 0 12px;
    border-radius: 8px;
    justify-content: space-around;
    color: #757575;
  }
  .btn {
    width: 83px !important;
    height: 36px !important;
  }
  .btn-login {
    margin-right: 16px !important;
  }
  .language {
    border: none !important;
  }
  .toggle {
    display: flex !important;
    top: 100px;
    right: 0;
  }
}
</style>
