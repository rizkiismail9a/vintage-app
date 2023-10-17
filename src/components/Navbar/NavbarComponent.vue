<template>
  <div class="navbar font-main fixed-top bg-white">
    <div class="container navbar__container d-flex flex-md-row flex-column">
      <!-- logo -->
      <router-link to="/"><img src="../../assets/images/logo.png" alt="vintage logo" class="navbar__logo" /></router-link>
      <!-- hamburger button -->
      <i class="fa-solid fa-bars fs-1 d-block d-md-none hamburger_btn mb-4" @click="showNavbar = !showNavbar"></i>

      <div class="nav-collapse d-flex flex-md-row flex-column align-items-center flex-grow-1" :class="{ toggle: showNavbar }">
        <!-- search form -->
        <form @submit.prevent="$emit('search', keyword)" class="d-flex navbar__form flex-grow-1 align-items-center" role="search">
          <i class="fa-solid fa-magnifying-glass fs-5 px-2"></i>
          <label for="exampleInputEmail1" class="form-label flex-grow-1 m-0">
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" @click="goToCollection" autofocus v-model="keyword" placeholder="Search for items" />
          </label>
          <div class="mb-3"></div>
        </form>
        <!-- auth menu -->
        <div class="d-flex navbar__auth justify-content-between align-items-center">
          <router-link to="/login" class="btn btn-outline-primary btn-login">Login</router-link>
          <router-link to="/signup" class="btn btn-primary btn-signup">Signup</router-link>
        </div>
        <div style="color: #404040" class="language border-start">EN<i class="fa-solid fa-chevron-down"></i></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const showNavbar = ref(false);
const router = useRouter();
const emits = defineEmits(["goToCollection"]);
const props = defineProps({
  isAtCollection: { type: Boolean, default: false },
});
const keyword = ref("");

function goToCollection() {
  if (!props.isAtCollection) {
    router.push("/collection");
  }
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
