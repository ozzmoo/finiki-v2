<template>
  <div class="login">
    <h2 class="login__title">Финики <sup>2.0</sup></h2>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          :type="passtype"
          required
        ></v-text-field>
        <div class="btns">
          <v-btn color="#007bff" dark @click="login">Войти</v-btn>
          <v-btn color="#4DB6AC" dark
            ><router-link to="/reg" class="rout-link"
              >Регистрация</router-link
            ></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="#007bff" dark class="login__guest" @click="guestLogin">
      Вход для студентов
    </v-btn>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      passtype: "Password",
    };
  },
  methods: {
    async login() {
      let logData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", logData);
        if (firebase.auth().currentUser) {
          this.$router.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    },
    guestLogin() {
      this.$router.push("/guest");
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.login {
  margin: 0 auto;
  max-width: 600px;
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  &__title {
    text-align: center;
    font-weight: 300;
    font-size: 4rem;
  }
  .btns {
    display: flex;
    justify-content: space-between;
  }
  &__guest {
    margin-top: 2rem;
    align-self: center;
  }
}
</style>