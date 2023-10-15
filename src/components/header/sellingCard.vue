<template>
  <div class="position-absolute card__wrapper p-3 d-flex align-items-center w-100 h-100">
    <div class="container mx-auto">
      <div class="card border-0 rounded">
        <h1 class="card__jargon">
          Ready to declutter<br />
          your closet?
        </h1>
        <button class="btn btn-primary card__button d-md-block d-none">Shop Now</button>
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
@media screen and (max-width: 768px) {
  .card {
    background-color: transparent;
  }
  .card__jargon {
    color: #fafafa;
  }
}
</style>
