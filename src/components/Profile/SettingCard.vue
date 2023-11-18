<template>
  <div class="sticky-top profile__navigation">
    <div class="setting__title">
      <h1 class="font-500">Setting</h1>
    </div>
    <div class="setting__link">
      <div class="list-group">
        <router-link to="/profile/profile-detail" class="list-group-item list-group-item-action font-500">Profile Details</router-link>
        <router-link to="/profile/edit-password" class="list-group-item list-group-item-action font-500">Change Password</router-link>
        <router-link to="/profile/transaction-history" class="list-group-item list-group-item-action font-500">Transaction History</router-link>
        <router-link to="/profile/my-products" class="list-group-item list-group-item-action font-500">My Products</router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.profile__navigation {
  top: 88px;
}
.setting__title {
  margin-bottom: 21px;
}
.setting__title h1 {
  font-size: 24px;
}
.list-group {
  --bs-list-group-item-padding-x: 1rem;
  --bs-list-group-item-padding-y: 0.5rem;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: var(--bs-list-group-border-radius);
}
.list-group-item {
  background-color: unset !important;
  border: none;
  cursor: pointer;
  padding: 16px !important;
  font-size: 1rem !important;
  color: #616161;
}
.router-link-active {
  color: #0a0a0a !important;
}
@media screen and (max-width: 768px) {
  .profile__navigation {
    width: 100%;
  }
  .setting__title {
    padding: 0 14px;
  }
}
</style>
