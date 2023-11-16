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
      cart: [],
      buyAgain: [],
      buyNow: [],
      userProducts: [],
    };
  },
  getters: {
    getAllProducts: (state) => state.products,
    getProductDetail: (state) => state.productOnDetail,
    popularProduct: (state) => {
      return state.products
        .sort((a, b) => {
          const likesLengthA = a.likes === undefined ? 0 : Object.keys(a.likes).length;
          const likesLengthB = b.likes === undefined ? 0 : Object.keys(b.likes).length;
          return likesLengthB - likesLengthA;
        })
        .slice(0, 5);
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
    getCart: (state) => state.cart,
    getOtherProducts: (state) => {
      const arrOfProductKeyInCart = [];
      for (let i = 0; i < state.cart.length; i++) {
        arrOfProductKeyInCart.push(state.cart[i].productKey);
      }
      return state.products.filter((item) => !arrOfProductKeyInCart.includes(item.productKey));
    },
    getFavoriteProduct: (state) => {
      const userId = Cookies.get("UID");
      const likedProductArr = [];

      state.products.forEach((item) => {
        for (let key in item.likes) {
          if (item.likes[key].UID === userId) {
            likedProductArr.push(item);
          }
        }
      });
      return likedProductArr;
    },
  },
  actions: {
    // get all products
    async findAllProducts() {
      try {
        const { data: products } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json`);
        // const { data: products } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json?orderBy="price"&startAt=100000&endAt=700000`);
        this.products = [];
        for (let key in products) {
          const result = { productKey: key, ...products[key] };
          this.products.push(result);
        }
        return this.products;
      } catch (error) {
        console.log(error);
      }
    },
    // create new product
    async addNewProduct(payload) {
      const authStore = useAuthStore();
      const token = authStore.getToken;
      try {
        const userId = Cookies.get("UID");
        const createdAt = new Date();
        const newData = { userId, likes: "", createdAt, ...payload };
        await axios.post(import.meta.env.VITE_BASE_URI + `/products.json?auth=${token}`, newData);
      } catch (error) {
        throw new Error(error.response.data.error.message);
        // console.log(error);
      }
    },
    async editProduct(payload) {
      const authStore = useAuthStore();
      const token = authStore.getToken;
      try {
        // const userId = Cookies.get("UID");
        // const createdAt = new Date();
        const newData = { ...payload.product };
        await axios.put(import.meta.env.VITE_BASE_URI + `/products/${payload.id}.json?auth=${token}`, newData);
      } catch (error) {
        throw new Error(error.response.data.error.message);
        // console.log(error);
      }
    },
    // get my product
    async finMyProduct() {
      const { data: products } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json`);
      const userId = Cookies.get("UID");
      const myProducts = [];
      for (let key in products) {
        if (products[key].userId === userId) {
          myProducts.push({ productKey: key, ...products[key] });
        }
      }
      this.userProducts = myProducts;
      // console.log(myProducts);
      // return myProducts;
    },
    // delete my product
    async deleteMyProduct(payload) {
      const token = Cookies.get("accessToken");
      try {
        await axios.delete(import.meta.env.VITE_BASE_URI + `/products/${payload}.json?auth=${token}`);
        await this.finMyProduct();
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
    // find related product for the detail page
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
    async findCartContent() {
      const authStore = useAuthStore();
      const userCart = authStore.getUser.cart;
      await this.findAllProducts();
      const data = [];
      this.products.forEach((item) => {
        for (let key in userCart) {
          if (item.productKey === userCart[key].productKey) {
            data.push({ amount: userCart[key].amount, cartKey: key, ...item });
          }
        }
      });
      this.cart = data;
      return data;
    },
    // add a product to cart
    async addToCart(payload) {
      // dapatkan key user yang ada di field
      const authStore = useAuthStore();
      const UID = Cookies.get("UID");
      const token = Cookies.get("accessToken");
      const userKey = Cookies.get("userKey");
      const { cart } = authStore.getUser;
      // cek apakah produk itu sudah ada di cart sebelumnya
      for (let key in cart) {
        if (cart[key].productKey === payload) {
          try {
            let { amount } = cart[key];
            amount += 1;
            const newData = { amount };
            await axios.patch(import.meta.env.VITE_BASE_URI + `/users/${userKey}/cart/${key}.json?auth=${token}`, newData);
            await authStore.findUser(UID);
            return;
          } catch (error) {
            console.log(error);
            return;
          }
        }
      }
      try {
        await axios.post(import.meta.env.VITE_BASE_URI + `/users/${userKey}/cart.json?auth=${token}`, { productKey: payload, amount: 1 });
        await authStore.findUser(UID);
      } catch (error) {
        console.log(error);
      }
    },
    // update product amount in the cart
    async updateCartAmount({ inputan, cartKey }) {
      const authStore = useAuthStore();
      const { cart } = authStore.getUser;
      const userKey = Cookies.get("userKey");
      const token = Cookies.get("accessToken");
      const UID = Cookies.get("UID");
      for (let key in cart) {
        if (key === cartKey) {
          try {
            let { amount } = cart[key];
            amount = inputan;
            const newData = { amount };
            await axios.patch(import.meta.env.VITE_BASE_URI + `/users/${userKey}/cart/${cartKey}.json?auth=${token}`, newData);
            await authStore.findUser(UID);
            return;
          } catch (error) {
            console.log(error);
            return;
          }
        }
      }
    },
    // remove a product
    async removeFromCart({ cartKey, index }) {
      const authStore = useAuthStore();
      const UID = Cookies.get("UID");
      const userKey = Cookies.get("userKey");
      const token = Cookies.get("accessToken");
      try {
        this.cart.splice(index, 1);
        await axios.delete(import.meta.env.VITE_BASE_URI + `/users/${userKey}/cart/${cartKey}.json?auth=${token}`);
        await authStore.findUser(UID);
      } catch (error) {
        console.log(error);
      }
    },
    // like a product
    async likeAProduct({ productKey }) {
      const UID = Cookies.get("UID");
      const token = Cookies.get("accessToken");
      try {
        await axios.post(import.meta.env.VITE_BASE_URI + `/products/${productKey}/likes.json?auth=${token}`, { UID });
        await this.findAllProducts();
      } catch (error) {
        console.log(error);
      }
    },
    // dislike a product
    async disLikeAProduct({ productKey, likesKey }) {
      const token = Cookies.get("accessToken");
      try {
        const { data: product } = await axios.get(import.meta.env.VITE_BASE_URI + `/products/${productKey}.json`);
        const { likes } = product;
        for (let key in likes) {
          if (key === likesKey) {
            delete likes[key];
          }
        }
        const newData = { ...likes };
        await axios.put(import.meta.env.VITE_BASE_URI + `/products/${productKey}/likes.json?auth=${token}`, newData);
        await this.findAllProducts();
      } catch (error) {
        console.log(error);
      }
    },
    // checkout from cart
    async checkout() {
      const authStore = useAuthStore();
      const UID = Cookies.get("UID");
      const cart = this.cart;
      const buyAgain = this.buyAgain;
      const buyNow = this.buyNow;
      const userKey = Cookies.get("userKey");
      const token = Cookies.get("accessToken");
      let productObj = null;
      if (buyAgain.length > 0) {
        productObj = Object.assign({}, buyAgain);
      } else if (buyNow.length > 0) {
        productObj = Object.assign({}, buyNow);
      } else {
        productObj = Object.assign({}, cart);
      }
      try {
        await axios.post(import.meta.env.VITE_BASE_URI + `/users/${userKey}/transactionHistory.json?auth=${token}`, {
          checkoutedAt: new Date().toLocaleDateString("en-EN", { weekday: "short", year: "numeric", month: "short", day: "numeric" }),
          ...productObj,
        });
        await axios.put(import.meta.env.VITE_BASE_URI + `/users/${userKey}/cart.json?auth=${token}`, {});
        this.cart = [];
        this.buyNow = [];
        this.buyAgain = [];
        await authStore.findUser(UID);
      } catch (error) {
        console.log(error);
      }
    },
    // buy again
    buyProductsAgain(products) {
      this.buyAgain = products;
    },
    // buy the product now
    async buyTheProductNow(productKey) {
      try {
        this.buyNow = [];
        const { data: product } = await axios.get(import.meta.env.VITE_BASE_URI + `/products/${productKey}.json`);
        const boughtProduct = { amount: 1, ...product };
        this.buyNow.push(boughtProduct);
      } catch (error) {
        console.log(error);
      }
    },
    // filter by price range
    async filterByPriceRange({ startAt, endAt }) {
      let result = [];
      try {
        if (startAt && endAt) {
          result = [];
          const { data } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json?orderBy="price"&startAt=${startAt}&endAt=${endAt}&print=pretty`);
          for (let key in data) {
            result.push(data[key]);
          }
        } else if (startAt && !endAt) {
          result = [];
          const { data } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json?orderBy="price"&startAt=${startAt}&print=pretty`);
          for (let key in data) {
            result.push(data[key]);
          }
        }
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    // filter by size
    async filterBySize(size) {
      let result = [];
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URI + `/products.json?orderBy="size"&startAt="${size}"&endAt="${size}"`);
        for (let key in data) {
          result.push(data[key]);
        }
        // console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
