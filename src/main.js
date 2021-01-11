import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyD8M7PeckCKTn1khk1BECtrzkhMWEPaEVQ",
  authDomain: "finiki-v2.firebaseapp.com",
  projectId: "finiki-v2",
  storageBucket: "finiki-v2.appspot.com",
  messagingSenderId: "768459544283",
  appId: "1:768459544283:web:bb56e19159004ff4389efe",
  measurementId: "G-E7H58YL8VL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(() => {
  new Vue({
    store,
    router,
    vuetify,
    Vuelidate,
    render: h => h(App)
  }).$mount('#app')
})