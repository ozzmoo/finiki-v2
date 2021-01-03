<template>
  <div class="home">
    <v-app-bar app elevation="1">
      <nav class="nav">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <h1 class="nav__title">Finiki 2.0</h1>
        <v-btn small icon @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
      </nav>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app absolute temporary clipped>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-gamepad-square</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><router-link to="/draw" class="rout-link">
                Определить победителя
              </router-link></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><router-link to="/addgroup" class="rout-link">
                Добавить группу
              </router-link></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-human-greeting</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><router-link to="/addpersons" class="rout-link">
                Добавить студентов
              </router-link></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <div class="routes"></div>
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
    return {
      drawer: false,
    };
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
  &__title {
    text-align: center;
    font-weight: 300;
  }
}

.rout-link {
  text-decoration: none;
  color: black !important;
}
</style>
