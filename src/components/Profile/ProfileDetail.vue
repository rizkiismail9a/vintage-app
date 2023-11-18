<template>
  <form @submit.prevent="updateProfile" class="profile__card card d-flex flex-column gap-3">
    <BaseModalTwo v-if="errorMsg">{{ errorMsg }}</BaseModalTwo>
    <SimpleLoading v-if="isLoading">{{ isLoading }}</SimpleLoading>
    <span class="font-400 font-61" style="font-size: 14px">Edit profile</span>
    <!-- input file -->
    <div class="edit__photo d-flex align-items-center w-100">
      <div class="font-500 font-0a flex-grow-1" style="font-size: 14px">Photo</div>
      <div class="input__photo d-flex align-items-center">
        <label for="userPhoto" class="position-relative d-flex align-items-center gap-3">
          <img v-if="!newUserData.imageLink" :src="temporaryLink" alt="" class="preview object-fit-cover rounded-circle" width="64" height="64" />
          <img v-else :src="newUserData.imageLink" alt="" class="preview object-fit-cover rounded-circle" width="64" height="64" />
          <button class="btn btn-secondary font-500 font-40">Choose</button>
          <input type="file" name="" id="userPhoto" class="input__file" @change="createLink" />
          <p class="font-400 font-40 m-0" style="font-size: 14px">JPG, JPEG or PNG, 1 MB max.</p>
        </label>
        <i class="fa-solid fa-trash-can ms-5 pointer" @click="deletePhoto"></i>
      </div>
    </div>
    <hr />
    <div class="mb-3">
      <label for="fullName" class="form-label font-500 font-0a" style="font-size: 14px">Full name</label>
      <input type="text" class="form-control" id="fullName" v-model="newUserData.fullname" />
    </div>
    <div class="mb-3">
      <label for="username" class="form-label font-500 font-0a" style="font-size: 14px">Username</label>
      <input type="text" class="form-control" id="username" v-model="newUserData.username" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label font-500 font-0a" style="font-size: 14px">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="newUserData.email" disabled />
    </div>
    <div class="mb-3">
      <div class="form-label font-500 font-0a" style="font-size: 14px">Address</div>
      <div>
        <!-- alamat -->
        <div class="mb-3">
          <label for="street" class="form-label font-500 font-61" style="font-size: 14px">Street</label>
          <input type="text" class="form-control" id="street" aria-describedby="emailHelp" v-model="newUserData.address" />
        </div>
        <div class="d-flex w-100 gap-2">
          <!-- desa -->
          <div class="mb-3 flex-grow-1">
            <label for="village" class="form-label font-500 font-61" style="font-size: 14px">District</label>
            <input type="text" class="form-control" id="village" aria-describedby="emailHelp" v-model="newUserData.district" />
          </div>
          <!-- kecamatan -->
          <div class="mb-3 flex-grow-1">
            <label for="street" class="form-label font-500 font-61" style="font-size: 14px">Subdistrict</label>
            <input type="text" class="form-control" id="street" aria-describedby="emailHelp" v-model="newUserData.subdistrict" />
          </div>
        </div>
        <div class="d-flex w-100 gap-2">
          <!-- desa -->
          <div class="mb-3 flex-grow-1">
            <label for="regency" class="form-label font-500 font-61" style="font-size: 14px">Regency</label>
            <input type="text" class="form-control" id="regency" aria-describedby="emailHelp" v-model="newUserData.regency" />
          </div>
          <!-- kecamatan -->
          <div class="mb-3 flex-grow-1">
            <label for="province" class="form-label font-500 font-61" style="font-size: 14px">Province</label>
            <input type="text" class="form-control" id="province" aria-describedby="emailHelp" v-model="newUserData.province" />
          </div>
        </div>
        <div class="d-flex w-100 gap-2">
          <!-- kode pos -->
          <div class="mb-3 zip__code">
            <label for="post" class="form-label font-500 font-61" style="font-size: 14px">Postal Code</label>
            <input type="number" class="form-control" id="post" aria-describedby="emailHelp" v-model.number="newUserData.postCode" />
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary align-self-end">Update Profile</button>
  </form>
</template>

<script setup>
import BaseModalTwo from "../Modal/BaseModalTwo.vue";
import SimpleLoading from "../Loading/SimpleLoading.vue";
import { computed, ref, reactive } from "vue";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
const errorMsg = ref("");
const userData = computed(() => {
  return authStore.user;
});
const temporaryLink = ref("/images/person.png");

const newUserData = reactive({
  imageLink: authStore.getUser.imageLink,
  fullname: authStore.getUser.fullname,
  email: authStore.getUser.email,
  username: authStore.getUser.username,
  address: authStore.getUser?.address,
  district: authStore.getUser?.district,
  subdistrict: authStore.getUser?.subdistrict,
  regency: authStore.getUser?.regency,
  province: authStore.getUser?.province,
  postCode: authStore.getUser?.postCode,
});
function createLink(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    temporaryLink.value = reader.result;
    newUserData.imageLink = reader.result;
  });
}
function deletePhoto() {
  temporaryLink.value = "/images/person.png";
  newUserData.imageLink = "";
}
const isLoading = ref("");
async function updateProfile() {
  if (
    newUserData.fullname === authStore.getUser.fullname &&
    newUserData.email === authStore.getUser.email &&
    newUserData.username === authStore.getUser.username &&
    newUserData.imageLink === authStore.getUser.imageLink &&
    newUserData.address === authStore.getUser.address &&
    newUserData.district === authStore.getUser.district &&
    newUserData.subdistrict === authStore.getUser.subdistrict &&
    newUserData.postCode === authStore.getUser.postCode &&
    newUserData.province === authStore.getUser.province &&
    newUserData.regency === authStore.getUser.regency
  ) {
    errorMsg.value = "You didn't change anything";
    return setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
  }
  try {
    isLoading.value = "Loading...";
    await authStore.updateProfile(newUserData);
    return setTimeout(() => {
      isLoading.value = "Profile updated!";
    }, 3000);
  } catch (error) {
    errorMsg.value = error;
  }
}
</script>

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

.btn-primary {
  padding: 10px 16px 10px 16px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px #1018281a;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

@media screen and (max-width: 900px) {
  .profile__card {
    width: 100%;
  }
  .edit__photo {
    flex-direction: column !important;
  }
  .btn-primary {
    width: 100%;
  }
  .zip__code {
    width: 100% !important;
  }
}
</style>
