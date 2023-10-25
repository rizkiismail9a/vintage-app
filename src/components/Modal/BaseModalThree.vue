<template>
  <Teleport to="body">
    <div class="modal__container font-main fixed-top w-100 d-flex justify-content-center align-items-center">
      <Transition name="pop" appear>
        <div class="modal__content d-flex flex-column card align-items-center gap-3">
          <div class="w-100">
            <div class="modal__header d-flex justify-content-between font-500 font-40 align-items-center">
              <span>{{ modalMsg }}</span>
              <span>x</span>
            </div>
            <div class="modal__body font-400 font-40">
              {{ subModalMsg }}
            </div>
            <div class="modal__btn d-flex align-items-center justify-content-end gap-3">
              <slot></slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  imageLink: { type: String },
  modalMsg: { type: String },
  subModalMsg: { type: String },
  button: { type: Array },
});
const router = useRouter();
function goToHome() {
  router.push("/");
}
</script>
<style scoped>
.modal__container {
  min-height: 100vh;
  background-color: rgba(142, 142, 142, 0.387);
}
.modal__content {
  width: 400px;
  box-shadow: 0px 1px 4px 0px #00000033;
  /* padding: 24px; */
}
.modal__header {
  padding: 16px 24px 8px 24px;
  font-size: 18px;
}
.modal__body {
  padding: 8px 24px 24px 24px;
  font-size: 14px;
}
.modal__btn {
  background-color: #f5f5f5;
  padding: 12px 24px 12px 24px;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
