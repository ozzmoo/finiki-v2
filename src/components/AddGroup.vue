<template>
  <div class="add-group">
    <v-text-field
      v-model="groupName"
      label="Название группы"
      required
    ></v-text-field>
    <v-btn @click="addGroup">Добавить</v-btn>
  </div>
</template>

<script>
export default {
  name: "AddGroup",
  data() {
    return {
      groupName: "",
    };
  },
  methods: {
    async addGroup() {
      let groupName = this.groupName;
      try {
        await this.$store.dispatch("addGroup", groupName);
        await this.$store.dispatch("getGroupListFromDB");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>