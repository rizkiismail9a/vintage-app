<template>
  <div class="detail__information card d-flex flex-column position-sticky" style="top: 100px">
    <!-- price -->
    <div class="d-flex justify-content-between flex-column">
      <div class="d-flex justify-content-between detail__price mb-2">
        <h3>Rp200.000</h3>
        <i class="fa-regular fa-heart"></i>
      </div>
      <p class="detail__name mb-2">Vintage chicago cubs white crewneck</p>
      <div class="detail__size d-flex align-items-center w-75 justify-content-between mb-2">
        <span>8/M </span>
        <i class="fa-solid fa-circle" style="font-size: 5px"></i>
        <span>Very good</span>
        <i class="fa-solid fa-circle" style="font-size: 5px"></i>
        <span>Cipanas</span>
      </div>
    </div>
    <hr />
    <p class="font-400" style="font-size: 14px; color: #404040">Item Description</p>
    <p class="font-400" style="font-size: 14px; color: #0a0a0a">Size Xl but fits more like M looser fit has a few minor marks (pictured)</p>
    <div class="detail__metadata row gx-3">
      <p class="col-6" style="color: #0a0a0a">Cetagory</p>
      <p class="col-6" style="color: #404040">Hodies and Sweater</p>
      <p class="col-6" style="color: #0a0a0a">Condition</p>
      <p class="col-6" style="color: #404040">Very Good</p>
      <p class="col-6" style="color: #0a0a0a">Color</p>
      <p class="col-6" style="color: #404040">Green</p>
      <p class="col-6" style="color: #0a0a0a">Uploaded</p>
      <p class="col-6" style="color: #404040">5 hours ago</p>
      <p class="col-6" style="color: #0a0a0a">Shipping</p>
      <p class="col-6" style="color: #404040">Rp20.000</p>
    </div>
    <hr />
    <div class="detail__button d-flex flex-column flex-grow-1 gap-3 my-2">
      <button class="btn btn-primary">Buy Now</button>
      <button class="btn btn-outline-primary" @click="$emit('addToCart')">Add to Cart</button>
    </div>
    <hr />
    <div class="detail__review border rounded d-flex gap-3">
      <img src="../../assets/images/user1.png" alt="" width="40" height="40" />
      <div>
        <p style="color: #0a0a0a; font-size: 14px" class="font-500 m-0">Dudung Sarudung</p>
        <div class="star">
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <i class="fa-solid fa-star" style="color: #f6790a"></i>
          <span style="color: #616161; font-size: 12px"> (110)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.detail__information {
  padding: 24px;
  border-radius: 8px;
}
.detail__price {
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
  color: #0a0a0a;
}
.detail__name {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  text-align: left;
  color: #0a0a0a;
}
.detail__size {
  font-size: 14px;
  font-weight: 400;
  color: #616161;
}
.detail__review {
  border-color: #ededed !important;
  padding: 16px;
}
@media screen and (max-width: 768px) {
  .detail__information {
    margin: 88px 0;
  }
  .detail__size {
    width: 100% !important;
  }
}
</style>
