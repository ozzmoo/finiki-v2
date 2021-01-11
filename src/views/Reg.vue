<template>
  <div class="reg">
    <v-card>
      <v-card-title> Регистрация </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Имя"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
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
        <v-btn color="#4DB6AC" dark @click="auth">Зарегистрироваться</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      passtype: "Password",
    };
  },
  methods: {
    async auth() {
      let authData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch("registration", authData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>