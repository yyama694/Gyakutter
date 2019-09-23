import Vue from "vue/dist/vue.esm.js";
import App from "./PrivacyPoricy.vue";
import "./registerServiceWorker";
import VueI18n from "vue-i18n";
import messages from "./messages.json";

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: navigator.language.split("-")[0],
  fallbackLocale: "ja",
  messages
});
new Vue({
  render: h => h(App),
  i18n
}).$mount("#privacy-poricy");
