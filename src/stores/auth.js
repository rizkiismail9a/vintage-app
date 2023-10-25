import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      accessToken: null,
      isLogin: false,
      tokenExp: null,
    };
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getLogin: (state) => state.isLogin,
  },
  actions: {
    // attemp
    async attemp(payload) {
      await this.findUser(payload.UID);
      await this.refresh(payload.token);
    },
    // register
    // simpan di autentikasi
    async regitster(payload) {
      const key = import.meta.env.VITE_API_KEY;
      try {
        const { data } = await axios.post(import.meta.env.VITE_REG_API + key, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        // set token
        console.log(data);
        this.accessToken = data.idToken;
        this.tokenExp = new Date().getTime() + Number.parseInt(data.expiresIn) * 1000;
        Cookies.set("tokenExp", this.tokenExp, { sameSite: "None", secure: true, expires: 1 });
        Cookies.set("accessToken", data.idToken, { sameSite: "None", secure: true, expires: 1 });
        const userData = {
          userId: data.localId,
          token: data.idToken,
          email: payload.email,
          fullname: payload.fullname,
          username: payload.username,
        };
        await this.createNewUser(userData);
        return "Successfuly Registered";
      } catch (error) {
        throw new Error(error.response.data.error.message);
      }
    },
    // simpan data user di realtime db
    async createNewUser(userData) {
      try {
        const { token, ...newUser } = userData;
        const { data } = await axios.post(import.meta.env.VITE_BASE_URI + "/users.json?auth=" + token, newUser);
        this.isLogin = true;
        this.user = newUser;
        Cookies.set("UID", newUser.userId, { sameSite: "None", secure: true, expires: 1 });
      } catch (error) {
        console.log(error);
      }
    },
    // login
    async login(payload) {
      const authURL = import.meta.env.VITE_LOG_API;
      const key = import.meta.env.VITE_API_KEY;
      try {
        const { data } = await axios.post(authURL + key, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        Cookies.set("UID", data.localId, { sameSite: "None", secure: true, expires: 1 });
        Cookies.set("accessToken", data.idToken, { sameSite: "None", secure: true, expires: 1 });
        this.tokenExp = new Date().getTime() + Number.parseInt(data.expiresIn) * 1000;
        Cookies.set("tokenExp", this.tokenExp, { sameSite: "None", secure: true, expires: 1 });
        await this.refresh(data.idToken);
        await this.findUser(data.localId);
        console.log(data);
      } catch (error) {
        throw new Error(error.response.data.error.message);
      }
    },
    async findUser(payload) {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URI + "/users.json");
        for (let key in data) {
          if (data[key].userId === payload) {
            this.isLogin = true;
            this.user = data[key];
          }
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async refresh(payload) {
      this.accessToken = payload;
    },
    // logout
    async logout() {
      Cookies.remove("accessToken");
      Cookies.remove("UID");
      Cookies.remove("tokenExp");
      this.user = {};
      this.accessToken = null;
      this.isLogin = false;
    },
  },
});
