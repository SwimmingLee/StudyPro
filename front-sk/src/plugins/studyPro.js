import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/scss/index.scss";
import globalComponents from "./globalComponents";

export default {
    install(Vue) {
        Vue.use(globalComponents);
    }
}