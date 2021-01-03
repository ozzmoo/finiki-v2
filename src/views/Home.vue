<template>
  <div class="home">
    <v-app-bar app>
      <nav class="nav">
        <img src="../assets/logo.svg" alt="" class="logo" />
        <v-btn @click="logout">Выйти</v-btn>
      </nav>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div class="routes">
          <router-link to="/addgroup">
            <v-btn> Добавить группу</v-btn>
          </router-link>
          <router-link to="/addpersons">
            <v-btn> Добавить студентов</v-btn>
          </router-link>
        </div>
        <GroupData />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import firebase from "firebase/app";
import GroupData from "../components/GroupData";
export default {
  name: "Home",
  components: { GroupData },
  data() {
    return {};
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  },
  computed: {},
  mounted() {
    this.$store.dispatch("getGroupListFromDB");
  },
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 40px;
    height: auto;
  }
}

.routes {
  display: flex;
  flex-wrap: wrap;
}
</style>
