<template>
  <div class="back">
    <v-btn @click="back">Назад</v-btn>
  </div>
</template>

<script>
export default {
  name: "Back",
  methods: {
    back() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
</style>