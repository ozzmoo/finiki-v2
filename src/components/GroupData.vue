<template>
  <div class="group-data">
    <v-card>
      <v-card-title>Финики</v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedGroup"
          :items="groupList"
          item-text="name"
          item-value="id"
          label="Выберите группу"
          outlined
          dense
          @change="
            setUpSelectedGroup();
            fillStudentList();
          "
        ></v-select>
        <div class="add-finiks">
          <v-autocomplete
            v-model="selectedStudent"
            :items="studentList"
            item-text="name"
            item-value="id"
            outlined
            dense
            label="Имя студента"
          ></v-autocomplete>
          <div class="add-finiks__inputs">
            <v-text-field
              class="count"
              v-model="count"
              label="Кол-во"
            ></v-text-field>
            <v-text-field v-model="comment" label="Комментарий"></v-text-field>
          </div>
          <v-btn @click="addFiniks">Добавить</v-btn>
        </div>
        <div class="group-data__table">
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-left">Студент</th>
                  <th class="text-left">Кол-во фиников</th>
                  <th class="text-left">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in studentList" :key="student.id">
                  <td>{{ student.name }}</td>
                  <td>{{ student.finiki }}</td>
                  <td>
                    <v-btn
                      @click="deleteSelfFiniks(selectedGroup, student.id)"
                      small
                      ><v-icon dark> mdi-close </v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GroupData",

  data() {
    return {
      selectedGroup: "",
      selectedStudent: "",
      comment: "",
      count: null,
      finikSumm: 0,
    };
  },
  methods: {
    /* Set selected group ID to global store */
    setUpSelectedGroup() {
      this.$store.commit("setSelectedGroup", this.selectedGroup);
    },
    /* Get students obj from db  */
    fillStudentList() {
      let group = this.selectedGroup;
      this.$store.dispatch("getStudentListFromDB", { group });
    },
    /* Add finiks by personID */
    addFiniks() {
      let studentID = this.selectedStudent;
      let groupID = this.selectedGroup;
      let count = this.count;
      let comment = this.comment;
      if (studentID) {
        this.$store.dispatch("addFiniks", {
          studentID,
          groupID,
          count,
          comment,
        });
        this.count = null;
        this.comment = "";
        this.fillStudentList();
      }
    },
    /* Delete all finiks on selected person */
    deleteSelfFiniks(groupID, studentID) {
      if (confirm("Вы собираетесь стереть все финики студента. Продолжить?")) {
        this.$store.dispatch("deleteFiniks", { groupID, studentID });
        this.fillStudentList();
      }
    },
    /*  */
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
    /*  */
    convertStudentListToArray(students) {
      let tempArray = [];
      for (let key in students) {
        tempArray.push({
          id: key,
          name: students[key].personName,
          finiki: this.computeFiniks(students[key].finiki),
        });
      }
      return tempArray;
    },
    /* Summ of finiks on one student */
    computeFiniks(finiks) {
      this.finikSumm = 0;
      for (let finik in finiks) {
        this.finikSumm += parseInt(finiks[finik].count);
      }
      return this.finikSumm;
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
.add-finiks__inputs {
  display: flex;

  & * {
    margin: 10px;
  }
}

.count {
  max-width: 150px;
}

.group-data {
  margin-top: 2rem;
}

.group-data__table {
  margin-top: 4rem;
}
</style>