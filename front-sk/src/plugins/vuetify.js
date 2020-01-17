import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
    theme: {
        primary: '#CBAA5C',
        secondary: '#083759'
    },
    iconfont: 'mdi'
});

export default new Vuetify({});