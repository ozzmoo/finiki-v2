<template>
  <div class="add-persons">
    <Back />
    <v-select
      v-model="selectedGroup"
      :items="groupList"
      item-text="name"
      item-value="id"
      label="Выберите группу"
      outlined
      filled
      background-color="#FFF"
      @change="getStudentsByGroup"
      no-data-text="Нет доступных групп"
    ></v-select>
    <div class="remove-add">
      <div class="remove-add__add">
        <v-card>
          <v-card-title>Добавить студента</v-card-title>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </div>
      <div class="remove-add__remove">
        <v-card>
          <v-card-title>Удалить студента</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="selectedStudent"
              :items="studentList"
              item-text="name"
              item-value="id"
              outlined
              label="Студент"
              no-data-text="Нет доступных студентов"
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
          </v-card-text>
        </v-card>
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
      if (this.selectedGroup) {
        try {
          await this.$store.dispatch("addPersonToGroup", {
            personName: this.personName,
            selectedGroup: this.selectedGroup,
          });
          this.personName = "";
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Выберите группу");
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>