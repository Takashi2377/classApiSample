import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "yuetin-hexschool",
      products: [],
      temp: {},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then(() => {
          this.getData(); //確認驗證才能取得資料
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html"; //驗證失敗，跳轉回登入頁面
        });
    },
    getData() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products`) //帶入個人的 path 以便取得自己上傳的資料
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openProduct(item) {
      this.temp = item;
    },
  },
  mounted() {
    //取出token並夾帶到headers中做發送
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    this.checkAdmin();
  },
}).mount("#app");
