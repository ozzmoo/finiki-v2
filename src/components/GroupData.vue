<template>
  <div class="group-data">
    <v-card>
      <v-card-title class="group-data__title">
        <span>Финики</span>
        <v-btn
          href="https://telegra.ph/Finiki-20---Kak-polzovatsya-01-14"
          outlined
          small
        >
          Инструкция
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedGroup"
          :items="groupList"
          item-text="name"
          item-value="id"
          label="Выберите группу"
          no-data-text="Нет доступных групп"
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
            no-data-text="Нет доступных студентов"
          ></v-autocomplete>
          <div class="add-finiks__inputs">
            <v-text-field
              class="count"
              v-model="count"
              label="Кол-во"
            ></v-text-field>
            <v-text-field v-model="comment" label="Комментарий"></v-text-field>
          </div>
          <v-btn color="#007bff" dark @click="addFiniks">Добавить</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text class="group-data__table">
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
                    @click="showStudentInfo(selectedGroup, student.id)"
                    small
                    icon
                    color="green"
                    ><v-icon dark> mdi-information-outline </v-icon>
                  </v-btn>
                  <v-btn
                    @click="deleteSelfFiniks(selectedGroup, student.id)"
                    small
                    icon
                    color="red lighten-1"
                    ><v-icon dark> mdi-trash-can-outline </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-overlay :dark="false" :value="isStudentInfoShow">
          <v-card class="stud-info">
            <v-btn icon @click="isStudentInfoShow = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-text class="stud-info__main"><StudentInfo /></v-card-text>
          </v-card>
        </v-overlay>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import StudentInfo from "./StudentInfo";
export default {
  name: "GroupData",
  components: {
    StudentInfo,
  },
  data() {
    return {
      selectedGroup: "",
      selectedStudent: "",
      comment: "",
      count: "",
      finikSumm: 0,
      isStudentInfoShow: false,
      test: true,
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
      if (count == "" || comment == "") {
        alert("Заполните поля Количество и Комментарий");
        return false;
      }
      if (studentID) {
        this.$store.dispatch("addFiniks", {
          studentID,
          groupID,
          count,
          comment,
        });
        this.count = "";
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
    showStudentInfo(groupID, studentID) {
      this.isStudentInfoShow = true;
      this.$store.dispatch("showStudentInfo", { groupID, studentID });
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

.group-data__title {
  display: flex;
  justify-content: space-between;
}

.count {
  max-width: 150px;
}

.group-data {
  margin-top: 2rem;
}

.group-data__table {
  margin-top: 2rem;
}

.stud-info {
  min-width: 290px;
  &__main {
    padding-top: 0px;
  }
}
</style>