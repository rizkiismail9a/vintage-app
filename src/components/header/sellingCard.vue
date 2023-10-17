<template>
  <div class="position-absolute card__wrapper p-3 d-md-flex align-items-center w-100 h-100 d-none">
    <div class="container mx-auto">
      <div class="card border-0 rounded">
        <h1 class="card__jargon">
          Ready to declutter<br />
          your closet?
        </h1>
        <router-link to="/collection" class="btn btn-primary card__button d-md-block d-none">Shop Now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card__wrapper {
  top: 0;
  background-color: transparent;
  z-index: 20;
}
.card {
  width: 342px;
}
.card__jargon {
  font-weight: 500;
  font-size: 28px;
  margin: 24px;
  color: #0a0a0a;
}
.card__button {
  margin: 8px 24px 24px 24px;
}
</style>
