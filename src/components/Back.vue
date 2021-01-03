<template>
  <div class="back">
    <v-btn large icon @click="back"><v-icon>mdi-arrow-left</v-icon></v-btn>
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
.back {
  width: 100%;
}
</style>