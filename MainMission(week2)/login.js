import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin"; //站點 + api文件中 "登入" 需要使用的路徑
      axios
        .post(api, this.user) //從文件中得知需使用post。 接收參數: 1.api路徑 2.依文件指示帶入所需物件
        .then((res) => {
          const { token, expired } = res.data; //從結果中，取出token & expired
          document.cookie = `myToken=${token};expires=${new Date(expired)};`;
          window.location = "products.html"; //帳密驗證成功，跳轉到產品頁面
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
