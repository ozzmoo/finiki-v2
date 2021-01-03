<template>
  <div class="add-persons">
    <v-select
      v-model="selectedGroup"
      :items="groupList"
      item-text="name"
      item-value="id"
      label="Выберите группу"
    ></v-select>
    <v-text-field
      v-model="personName"
      label="Имя Фамилия студента"
      required
    ></v-text-field>
    <v-btn @click="addPerson">Добавить</v-btn>
  </div>
</template>

<script>
export default {
  name: "AddPersons",
  data() {
    return {
      personName: "",
      selectedGroup: null,
    };
  },
  methods: {
    async addPerson() {
      try {
        await this.$store.dispatch("addPersonToGroup", {
          personName: this.personName,
          selectedGroup: this.selectedGroup,
        });
        this.personName = "";
      } catch (error) {
        console.log(error);
      }
    },

    convertGroupListToArray(groupList) {
      let tempArray = [];
      for (let key in groupList) {
        tempArray.push({
          id: key,
          name: groupList[key].groupName,
        });
      }
      return tempArray;
    },
  },
  computed: {
    groupList() {
      return this.convertGroupListToArray(this.$store.getters.groupList);
    },
  },
};
</script>

<style>
</style>