import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";

import ImageUploader from "vue-image-upload-resize";
Vue.use(ImageUploader);

// import VueQRCodeComponent from "vue-qrcode-component";
// Vue.component("qr-code", VueQRCodeComponent);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import * as LottiePlayer from "@lottiefiles/lottie-player";
Vue.use(LottiePlayer);

import QrcodeVue from "qrcode.vue";
Vue.component("QrcodeVue", QrcodeVue);

import LottieAnimation from 'lottie-web-vue';
Vue.component("LottieAnimation", LottieAnimation);

import VueQrcodeReader from "vue-qrcode-reader";
Vue.use(VueQrcodeReader);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faScroll,
  faEnvelopeOpenText,
  faEnvelope,
  faRunning,
  faWindowClose,
  faPaperPlane,
  faQrcode,
  faEdit,
  faBook,
  faTrash,
  faCheckCircle,
  faArrowLeft,
  faCirclePlus,
  faEye,
  faPrint,
  faCheck,
  faExclamationCircle,
  faBan,
  faBars,
  faBarcode,
  faSignal,
  faChartLine,
  faUserCircle,
  faDownload,
  faUpload,
  faGamepad,
  faBurger,
  faMagnifyingGlass,
  faCircleDollarToSlot,
  faPlus,
  faCreditCard,
  faClockRotateLeft,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faScroll,
  faEnvelopeOpenText,
  faEnvelope,
  faRunning,
  faWindowClose,
  faPaperPlane,
  faQrcode,
  faEdit,
  faBook,
  faTrash,
  faCheckCircle,
  faArrowLeft,
  faCirclePlus,
  faEye,
  faPrint,
  faCheck,
  faExclamationCircle,
  faBan,
  faBars,
  faBarcode,
  faSignal,
  faChartLine,
  faUserCircle,
  faDownload,
  faUpload,
  faGamepad,
  faBurger,
  faMagnifyingGlass,
  faCircleDollarToSlot,
  faPlus,
  faCreditCard,
  faClockRotateLeft,
  faUnlock,
);
Vue.component("font-awesome-icon", FontAwesomeIcon);


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VeeValidate, {
  fieldsBagName: "vvFields",
});
Vue.use(require("vue-moment"));
import moment from "moment";
Vue.prototype.moment = moment;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
