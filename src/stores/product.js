import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";
import Cookies from "js-cookie";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      products: [],
      productOnDetail: {},
    };
  },
  getters: {
    getAllProducts: (state) => state.products,
    getProductDetail: (state) => state.productOnDetail,
  },
  actions: {
    // get all products
    async findAllProducts() {
      try {
        const { data: products } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json`);
        for (let key in products) {
          this.products.push(products[key]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // create new product
    async addNewProduct(payload) {
      const authStore = useAuthStore();
      const key = authStore.getToken;
      try {
        const userId = Cookies.get("UID");
        const createdAt = new Date().toLocaleDateString("en-EN", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
        const newData = { userId, likes: "", createdAt, ...payload };
        await axios.post(import.meta.env.VITE_BASE_URI + `/products.json?auth=${key}`, newData);
      } catch (error) {
        throw new Error(error.response.data.error.message);
        // console.log(error);
      }
    },
    // get my product
    async finMyProduct() {
      const { data: producst } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json`);
      const userId = Cookies.get("UID");
      const myProducts = [];
      for (let key in producst) {
        if (producst[key].userId === userId) {
          myProducts.push({ key, ...producst[key] });
        }
      }
      // console.log(myProducts);
      return myProducts;
    },
    // delete my product
    async deleteMyProduct(payload) {
      const token = Cookies.get("accessToken");
      try {
        await axios.delete(import.meta.env.VITE_BASE_URI + `/products/${payload}.json?auth=${token}`);
      } catch (error) {
        throw new Error(error.response.data.error.message);
      }
    },
  },
});
