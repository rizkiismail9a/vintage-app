<template>
  <div class="border rounded d-flex flex-column p-3">
    <!-- order number, date, ect -->
    <div class="d-flex align-items-center gap-3 mb-3">
      <img src="../../assets/images/bag-handle.png" width="24" height="24" alt="" />
      <p class="font-500 font-0a m-0" style="font-size: 14px">Shopping</p>
      <p class="font-400 font-40 m-0" style="font-size: 14px">Oct 18, 2023</p>
      <p class="font-500 font-40 m-0 py-1 px-2" style="font-size: 12px; color: #10af13; background-color: #effff0">Done</p>
      <p class="font-400 font-40 m-0" style="font-size: 14px">ORD-20230613/XXII/VI/1920930123</p>
    </div>
    <!-- product detail -->
    <div class="d-flex align-items-start">
      <!-- product img, metadata, ect -->
      <div class="d-flex flex-column">
        <!-- product and detail -->
        <div class="d-flex align-items-center gap-4 mb-3">
          <img src="../../assets/images/baju1.png" width="64" height="64" class="object-fit-cover" alt="" />
          <div class="d-flex flex-column gap-2" style="width: 445px">
            <h2 class="font-500 text-black" style="font-size: 1rem; line-height: 24px">Too Busy To Care Crop Tee And Jogger Set - Heather Grey</h2>
            <p class="font-400 font-40 m-0" style="font-size: 14px">1 product x Rp200.000</p>
            <p class="font-400 font-61 m-0" style="font-size: 14px">8 / M</p>
          </div>
        </div>
        <!-- more message -->
        <p class="font-400 font-40 m-0" style="font-size: 14px">+ 2 more products</p>
      </div>
      <!-- total price -->
      <div class="ms-3 w-100 ps-3 ms-4 border-start d-flex flex-column">
        <p class="font-400 font-40 m-0" style="font-size: 12px">Total price</p>
        <p class="font-500 font-0a">Rp100000</p>
      </div>
    </div>
    <hr />
    <button type="submit" class="btn btn-primary align-self-end">Buy Again</button>
  </div>
</template>

<script setup></script>
<style scoped>
.btn-primary {
  padding: 10px 16px 10px 16px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px #1018281a;
}
</style>
