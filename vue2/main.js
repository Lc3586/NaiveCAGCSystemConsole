import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/message/style/css';


Vue.use(router);
Vue.use(store);
Vue.use(i18n);
Vue.use(VueCompositionAPI);
new Vue({
    el: '#app',
    render: h => h(App)
})
