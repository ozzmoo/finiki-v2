<template>
  <div class="add-group">
    <Back />
    <v-text-field
      v-model="groupName"
      label="Название группы"
      required
    ></v-text-field>
    <v-btn color="#007bff" dark @click="addGroup">Добавить</v-btn>
  </div>
</template>

<script>
import Back from "./Back";

export default {
  name: "AddGroup",
  components: {
    Back,
  },
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
        this.groupName = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>