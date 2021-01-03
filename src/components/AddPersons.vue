<template>
  <div class="add-persons">
    <Back />
    <v-select
      v-model="selectedGroup"
      :items="groupList"
      item-text="name"
      item-value="id"
      label="Выберите группу"
      @change="getStudentsByGroup"
    ></v-select>
    <div class="remove-add">
      <div class="remove-add__add">
        <v-text-field
          v-model="personName"
          label="Студент"
          outlined
          required
        ></v-text-field>
        <v-btn
          color="#007bff"
          dark
          @click="
            addPerson();
            getStudentsByGroup();
          "
          >Добавить</v-btn
        >
      </div>
      <div class="remove-add__remove">
        <v-autocomplete
          v-model="selectedStudent"
          :items="studentList"
          item-text="name"
          item-value="id"
          outlined
          label="Студент"
        ></v-autocomplete>
        <v-btn
          color="red lighten-1"
          dark
          @click="
            removeStudent();
            getStudentsByGroup();
          "
          >Удалить</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import Back from "./Back";

export default {
  name: "AddPersons",
  components: {
    Back,
  },
  data() {
    return {
      personName: "",
      selectedGroup: null,
      selectedStudent: null,
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
    getStudentsByGroup() {
      let group = this.selectedGroup;
      this.$store.dispatch("getStudentListFromDB", { group });
    },
    removeStudent() {
      this.$store.dispatch("removeStudent", {
        groupID: this.selectedGroup,
        studentID: this.selectedStudent,
      });
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
    convertStudentListToArray(students) {
      let tempArray = [];
      for (let key in students) {
        tempArray.push({
          id: key,
          name: students[key].personName,
        });
      }
      return tempArray;
    },
  },
  computed: {
    groupList() {
      return this.convertGroupListToArray(this.$store.getters.groupList);
    },
    studentList() {
      return this.convertStudentListToArray(this.$store.getters.students);
    },
  },
};
</script>

<style lang="scss" scoped>
.remove-add {
  display: flex;
  justify-content: space-between;
  &__add {
    width: 45%;
  }
  &__remove {
    width: 45%;
  }
}
</style>