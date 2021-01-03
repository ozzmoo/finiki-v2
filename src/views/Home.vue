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
        <p>Красава, {{ currentUser ? currentUser.name : null }}</p>
        <AddGroup />
        <AddPersons />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import firebase from "firebase/app";
import AddGroup from "../components/AddGroup";
import AddPersons from "../components/AddPersons";
export default {
  name: "Home",
  components: {
    AddGroup,
    AddPersons,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    getDBValue() {
      return firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .once("value")
        .then((snapshot) => {
          this.currentUser = snapshot.val();
        });
    },
  },
  computed: {},
  mounted() {
    this.getDBValue();
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
</style>
