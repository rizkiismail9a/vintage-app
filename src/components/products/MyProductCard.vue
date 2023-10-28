<template>
  <div class="col-md-6">
    <div class="card d-flex flex-column p-3">
      <div class="d-flex align-items-center justify-content-between">
        <div class="product__info d-flex justify-content-between flex-column h-100">
          <p class="font-400 font-61">Rp200000</p>
          <h1 class="font-500 font-0a">Baju Kuning</h1>
          <span class="font-500 font-61 mt-auto" style="justify-self: end">Thu Jun 08 23</span>
        </div>
        <img src="../../assets/images/baju1.png" alt="" width="100" class="object-fit-cover" />
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <button class="btn btn-outline-danger">Delete</button>
        <button class="btn btn-outline-primary">Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.product__info h1 {
  font-size: 18px;
}
</style>
