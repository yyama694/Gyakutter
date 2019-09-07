import Vue from "vue/dist/vue.esm.js";
import App from "./App.vue";
import "./registerServiceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueI18n from "vue-i18n";
import messages from "./messages.json";

library.add(faRetweet);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: navigator.language.split("-")[0],
  fallbackLocale: "ja",
  messages
});
new Vue({
  render: h => h(App),
  i18n
}).$mount("#app");
