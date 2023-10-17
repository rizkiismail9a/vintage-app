<template>
  <footer class="d-flex flex-column">
    <div class="container-sm footer__content row mx-auto">
      <!-- footer 1 -->
      <div class="d-flex flex-column col-md-3 col-12">
        <h1 class="footer__menu-title font-500">Vintage</h1>
        <ul class="footer__menu-list ps-0">
          <li>About Us</li>
          <li>Sustainwbility</li>
          <li>Blog</li>
          <li>Advertising</li>
        </ul>
      </div>
      <!-- footer 2 -->
      <div class="d-flex flex-column col-md-3 col-12">
        <h1 class="footer__menu-title font-500">Discover</h1>
        <ul class="footer__menu-list ps-0">
          <li>How it works</li>
          <li>Help center</li>
          <li>Infoboard</li>
          <li>Mobile apps</li>
        </ul>
      </div>
      <!-- footer 3 -->
      <div class="d-flex flex-column col-md-3 col-12">
        <h1 class="footer__menu-title font-500">Help</h1>
        <ul class="footer__menu-list ps-0">
          <li>Help center</li>
          <li>Buying</li>
          <li>Trust & Safety</li>
        </ul>
      </div>
      <!-- footer 4 -->
      <div class="d-flex flex-column col-md-3 col-12">
        <h1 class="footer__menu-title font-500">Comunity</h1>
        <ul class="footer__menu-list ps-0">
          <li>Form</li>
        </ul>
      </div>
      <hr />
    </div>
    <!-- sub footer -->
    <div class="container-sm sub-footer d-flex justify-content-between">
      <div class="footer__socmed d-flex justify-content-around">
        <img src="../../assets/images/wa.png" alt="" />
        <img src="../../assets/images/ig.png" alt="" />
        <img src="../../assets/images/linkedin.png" alt="" />
      </div>
      <div class="footer__copyright font-400">&copy; Vintage, 2023</div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
footer {
  color: #f5f5f5;
  background-color: #0d5054;
  padding: 56px 0;
}
.footer__menu-title {
  font-size: 18px;
}
.footer__menu-list li {
  font-weight: 400;
  font-size: 16px;
  line-height: 3.3;
}
.footer__socmed img {
  width: 23.33px;
  height: 23.33px;
  object-fit: cover;
  margin-right: 24px;
}
.footer__copyright {
  font-size: 14px;
}
</style>
