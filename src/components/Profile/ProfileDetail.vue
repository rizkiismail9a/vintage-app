<template>
  <form class="profile__card card d-flex flex-column gap-3">
    <span class="font-400 font-61" style="font-size: 14px">Edit profile</span>
    <!-- input file -->
    <div class="edit__photo d-flex align-items-center w-100">
      <div class="font-500 font-0a flex-grow-1" style="font-size: 14px">Photo</div>
      <div class="input__photo d-flex align-items-center">
        <label for="userPhoto" class="position-relative d-flex align-items-center gap-3">
          <img src="../../assets/images/user1.png" alt="" class="preview object-fit-cover" width="64" height="64" />
          <button class="btn btn-secondary font-500 font-40">Choose</button>
          <input type="file" name="" id="userPhoto" class="input__file" />
          <p class="font-400 font-40 m-0" style="font-size: 14px">JPG, JPEG or PNG, 1 MB max.</p>
        </label>
        <i class="fa-solid fa-trash-can ms-5"></i>
      </div>
    </div>
    <hr />
    <div class="mb-3">
      <label for="fullName" class="form-label font-500 font-0a" style="font-size: 14px">Full name</label>
      <input type="text" class="form-control" id="fullName" />
    </div>
    <div class="mb-3">
      <label for="username" class="form-label font-500 font-0a" style="font-size: 14px">Username</label>
      <input type="text" class="form-control" id="username" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label font-500 font-0a" style="font-size: 14px">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
    </div>
    <button type="submit" class="btn btn-primary align-self-end">Update Profile</button>
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
  padding: 0.375rem 0.75rem;
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
