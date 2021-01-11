<template>
  <div class="login">
    <h2 class="login__title">Финики <sup>2.0</sup></h2>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          :type="passtype"
          required
          outlined
        ></v-text-field>
        <div class="btns">
          <v-btn
            class="btns__item"
            color="#007bff"
            dark
            @click="
              login();
              validateForm();
            "
            >Войти</v-btn
          >
          <v-btn
            class="btns__item"
            color="#DF4930"
            dark
            dense
            @click="loginWithGoogle"
            >Войти через<v-icon color="white" class="google-icon"
              >mdi-google</v-icon
            ></v-btn
          >
          <v-btn class="btns__item" color="#4DB6AC" dark
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
    <v-snackbar v-model="errorSnack" :timeout="errorTimeout">
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="errorSnack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-empty */
import firebase from "firebase/app";
export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      passtype: "Password",
      error: "",
      errorSnack: false,
      errorTimeout: 2000,
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
      } catch (e) {
        console.log("vue");
      }
    },
    async loginWithGoogle() {
      try {
        await this.$store.dispatch("loginWithGoogle");
        if (firebase.auth().currentUser) {
          this.$router.push("/home");
        }
      } catch (e) {
        console.log(e);
      }
    },
    guestLogin() {
      this.$router.push("/guest");
    },
    validateForm() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email == "") {
        this.error = "Введите email";
        this.errorSnack = true;
      }
      if (!re.test(String(this.email).toLowerCase())) {
        this.error = "Такого email не существует";
        this.errorSnack = true;
      }
    },
  },
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
    margin: 0 auto;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    &__item {
      margin-top: 1rem;
    }
  }
  &__guest {
    margin-top: 2rem;
    align-self: center;
  }
}
.rout-link {
  color: white !important;
}
.google-icon {
  margin-left: 0.5rem;
}
</style>