<template>
  <div class="navbar font-main fixed-top bg-white">
    <div class="container navbar__container d-flex flex-md-row flex-column">
      <!-- logo -->
      <router-link to="/"><img src="../../assets/images/logo.png" alt="vintage logo" class="navbar__logo" /></router-link>
      <div>
        <div class="language font-40">EN<i class="fa-solid fa-chevron-down" style="margin-left: 8px"></i></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .navbar {
    padding: 12px 120px 12px 120px;
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

  .language {
    border: none !important;
  }
}
</style>
