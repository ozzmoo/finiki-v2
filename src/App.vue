<template>
  <v-app>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "App",
  components: {},
  data: () => ({}),
  methods: {},
  mounted() {
    if (firebase.auth().currentUser) {
      this.$router.push("/home");
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">
.rout-link {
  text-decoration: none;
  color: black !important;
}
</style>
