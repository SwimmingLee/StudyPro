import Vue from 'vue';
import globalComponents from "./globalComponents";
import infiniteScroll from 'vue-infinite-scroll'

import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/scss/index.scss";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
import VDaterange from '@/components/base/VDaterange'

Vue.use(globalComponents);
Vue.use(infiniteScroll);

const VuetifyDaterangePicker = {
    install(Vue) {
        Vue.component(VDaterange.name, VDaterange);
    }
};
export default VuetifyDaterangePicker;
export { VDaterange };