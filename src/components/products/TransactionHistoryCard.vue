<template>
  <div class="border rounded d-flex flex-column p-3 mb-4">
    <!-- order number, date, ect -->
    <div class="d-flex align-items-center gap-3 mb-3">
      <img src="../../assets/images/bag-handle.png" width="24" height="24" alt="" />
      <p class="font-500 font-0a m-0" style="font-size: 14px">Shopping</p>
      <p class="font-400 font-40 m-0" style="font-size: 14px">{{ product.checkoutedAt }}</p>
      <p class="font-500 font-40 m-0 py-1 px-2" style="font-size: 12px; color: #10af13; background-color: #effff0">Done</p>
      <p class="font-400 font-40 m-0" style="font-size: 14px">ORD-20230613/XXII/VI/1920930123</p>
    </div>
    <!-- product detail -->
    <div class="d-flex align-items-start">
      <!-- product img, metadata, ect -->
      <div class="d-flex flex-column">
        <!-- product and detail -->
        <div class="d-flex align-items-center gap-4 mb-3">
          <img :src="getFirstObject[0].imageLink" width="64" height="64" class="object-fit-cover" alt="" />
          <div class="d-flex flex-column gap-2" style="width: 445px">
            <h2 class="font-500 text-black" style="font-size: 1rem; line-height: 24px">Too {{ getFirstObject[0].name }}</h2>
            <p class="font-400 font-40 m-0" style="font-size: 14px">{{ getFirstObject[0].amount }} product x {{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(getFirstObject[0].price) }}</p>
            <p class="font-400 font-61 m-0" style="font-size: 14px">{{ getFirstObject[0].size }}</p>
          </div>
        </div>
        <!-- more message -->
        <p v-if="getFirstObject.length > 1" class="font-400 font-40 m-0" style="font-size: 14px">{{ getFirstObject.length - 1 }} more products</p>
      </div>
      <!-- total price -->
      <div class="ms-3 w-100 ps-3 ms-4 border-start d-flex flex-column">
        <p class="font-400 font-40 m-0" style="font-size: 12px">Total price</p>
        <p class="font-500 font-0a">{{ new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice) }}</p>
      </div>
    </div>
    <hr />
    <button type="submit" class="btn btn-primary align-self-end" @click="buyAgain(getFirstObject)">Buy Again</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { toRef, computed } from "vue";
import { useProductStore } from "../../stores/product";
const props = defineProps({
  product: { type: Object },
});
const router = useRouter();
const productStore = useProductStore();
const getFirstObject = computed(() => {
  const accArr = [];
  const { checkoutedAt, ...rest } = props.product;
  for (let key in rest) {
    accArr.push(props.product[key]);
  }
  console.log(accArr);
  return accArr;
});
const totalPrice = computed(() => {
  const accArr = [];
  const { checkoutedAt, ...rest } = props.product;
  for (let key in rest) {
    accArr.push(props.product[key]);
  }
  let price0 = 0;
  accArr.forEach((item) => (price0 += item.price * item.amount));
  return price0;
});
function buyAgain(products) {
  productStore.buyProductsAgain(products);
  router.push("/cart/checkout-card/checkout-summary");
}
</script>
<style scoped>
.btn-primary {
  padding: 10px 16px 10px 16px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px #1018281a;
}
</style>
