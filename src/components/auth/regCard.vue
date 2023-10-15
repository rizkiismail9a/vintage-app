<template>
  <div class="register__card card font-main d-flex flex-column justify-content-between">
    <!-- title -->
    <h1 class="register__title m-0 d-flex justify-content-between"><span>Sign up</span> <i class="fa-solid fa-xmark"></i></h1>
    <div class="register__form">
      <form class="d-flex flex-column justify-content-between">
        <p class="register__subtitle">Enter your details below</p>
        <!-- full name -->
        <div class="d-flex flex-column position-relative">
          <label for="fullName" class="font-500 mb-1">Full name <span style="color: red">*</span></label>
          <input type="text" id="fullName" class="input__form mx-0" placeholder="Enter your fullname" />
        </div>
        <!-- username -->
        <div class="d-flex flex-column position-relative">
          <label for="username" class="font-500 mb-1">Username <span style="color: red">*</span></label>
          <input type="text" id="username" class="input__form mx-0" placeholder="Enter your username" />
        </div>
        <!-- email -->
        <div class="d-flex flex-column position-relative">
          <label for="email" class="font-500 mb-1">Email <span style="color: red">*</span></label>
          <input type="email" id="email" class="input__form mx-0" placeholder="Enter your email" />
        </div>
        <!-- password -->
        <div class="d-flex flex-column position-relative">
          <label for="password" class="font-500 mb-1">Password <span style="color: red">*</span></label>
          <input type="password" id="password" class="input__form mx-0" placeholder="Enter your password" />
          <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 38px"></i>
        </div>
        <!-- password -->
        <div class="d-flex flex-column position-relative">
          <label for="passwordConfirm" class="font-500 mb-1">Confirmation Password <span style="color: red">*</span></label>
          <input type="password" id="passwordConfirm" class="input__form mx-0" placeholder="Enter your password" />
          <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 38px"></i>
        </div>
        <div class="d-flex gap-2 agreement d-flex align-items-start">
          <input type="checkbox" name="" id="" />
          <p class="m-0">By clicking sign up, I hereby agree and consent to Term & Conditions; I confirm that I have read Privacy policy.</p>
        </div>
        <button class="register__button btn btn-primary">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
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
.agreement input {
  width: 20px;
  height: 20px;
}
</style>
