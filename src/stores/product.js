import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";
import Cookies from "js-cookie";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      products: [],
      productOnDetail: {},
      relatedProducts: [],
    };
  },
  getters: {
    getAllProducts: (state) => state.products,
    getProductDetail: (state) => state.productOnDetail,
    popularProduct: (state) => {
      return state.products.slice(0, 5);
    },
    newProduct: (state) => {
      return state.products
        .sort((a, b) => {
          const date1 = new Date(a.createdAt);
          const date2 = new Date(b.createdAt);
          return date2 - date1;
        })
        .slice(0, 5);
    },
    getRelatedProducts: (state) => state.relatedProducts,
  },
  actions: {
    // get all products
    async findAllProducts() {
      try {
        const { data: products } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json`);
        this.products = [];
        for (let key in products) {
          const result = { key, ...products[key] };
          this.products.push(result);
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
        const createdAt = new Date();
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
    // get detail
    async findOneProduct(payload) {
      const authStore = useAuthStore();
      this.productOnDetail = {};
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URI + `/products/${payload}.json`);
        this.productOnDetail = data;
        await authStore.findUserById(data.userId);
      } catch (error) {
        console.log(error);
      }
    },
    async findRelatedProduct() {
      let related = [];
      try {
        await this.findAllProducts();
        this.products.forEach((item) => {
          if (item.userId === this.productOnDetail.userId) {
            related.push(item);
          }
        });
        this.relatedProducts = related;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
