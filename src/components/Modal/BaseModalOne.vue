<template>
  <Teleport to="body">
    <div class="modal__container font-main fixed-top w-100 d-flex justify-content-center align-items-center">
      <Transition name="pop" appear>
        <div class="modal__content d-flex flex-column card align-items-center gap-3">
          <!-- modal image -->
          <img :src="props.imageLink" width="150" height="150" class="modal__image object-fit-contain" alt="modal image" />
          <div class="d-flex flex-column">
            <h1 class="modal__message text-center font-500" style="font-size: 24px; color: #0a0a0a">{{ props.modalMsg }}</h1>
            <p class="font-400 text-center" style="color: #616161">{{ props.subModalMsg }}</p>
          </div>
          <div class="modal__button d-flex flex-column w-100 gap-3">
            <slot></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  imageLink: { type: String },
  modalMsg: { type: String },
  subModalMsg: { type: String },
});
</script>
<style scoped>
.modal__container {
  min-height: 100vh;
  background-color: rgba(142, 142, 142, 0.387);
}
.modal__content {
  width: 400px;
  box-shadow: 0px 1px 4px 0px #00000033;
  padding: 24px;
}
.btn {
  padding: 10px 16px 10px 16px;
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
