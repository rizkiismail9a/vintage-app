<template>
  <form class="profile__card card d-flex flex-column gap-3">
    <span class="font-400 font-61" style="font-size: 14px">Change password</span>
    <!-- input form -->
    <div class="mb-3 position-relative">
      <label for="oldPassword" class="form-label font-500 font-0a" style="font-size: 14px">Old Password</label>
      <input type="password" class="form-control" id="oldPassword" placeholder="Old password" />
      <i class="fa-solid fa-eye position-absolute" style="right: 10px; top: 42px"></i>
    </div>
    <div class="mb-3 position-relative">
      <label for="newPassword" class="form-label font-500 font-0a" style="font-size: 14px">New Password</label>
      <input type="password" class="form-control" id="newPassword" placeholder="New password" />
      <i class="fa-solid fa-eye position-absolute" style="right: 10px; top: 42px"></i>
    </div>
    <div class="mb-3 position-relative">
      <label for="passConfirm" class="form-label font-500 font-0a" style="font-size: 14px">Confirmation New Password</label>
      <input type="password" class="form-control" id="passConfirm" placeholder="Confirmation Password" />
      <i class="fa-solid fa-eye position-absolute" style="right: 10px; top: 42px"></i>
    </div>
    <button type="submit" class="btn btn-primary align-self-end">Save Changes</button>
  </form>
</template>

<script setup></script>

<style scoped>
.profile__card {
  width: 793px;
  padding: 20px 24px 20px 24px;
  border: 1px solid #ededed;
}
.input__file {
  cursor: pointer;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  /* z-index: 99; */
  /* font-size: 50px; */
  opacity: 0;
}
.btn-secondary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #f5f5f5;
  --bs-btn-border-color: #f5f5f5;
  --bs-btn-hover-color: #404040;
  --bs-btn-hover-bg: #e0e0e0;
  --bs-btn-hover-border-color: #e0e0e0;
  --bs-btn-focus-shadow-rgb: 130, 138, 145;
  --bs-btn-active-color: #404040;
  --bs-btn-active-bg: #e0e0e0;
  --bs-btn-active-border-color: #e0e0e0;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-border-color: #f5f5f5;
  box-shadow: 0px 1px 3px 0px #1018281a;
}
.form-control {
  outline: unset;
  outline-color: unset;
  display: block;
  width: 100%;
  padding: 8px 40px 8px 12px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
input:focus {
  outline: 3px solid var(--vintage-main-color) !important;
}
.btn-primary {
  padding: 10px 16px 10px 16px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px #1018281a;
}
</style>
