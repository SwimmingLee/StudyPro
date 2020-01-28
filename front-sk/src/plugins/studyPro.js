import Vue from 'vue';
import globalComponents from "./globalComponents";
import infiniteScroll from 'vue-infinite-scroll'

import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/scss/index.scss";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//DateRange
import VuetifyDaterangePicker from 'vuetify-daterange-picker'
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css"

Vue.use(globalComponents);
Vue.use(infiniteScroll);

//DateRange
Vue.use(VuetifyDaterangePicker);

export default {}