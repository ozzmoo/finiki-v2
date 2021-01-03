
<template>
  <div class="draw">
    <Back />
    <v-select
      class="draw__select"
      v-model="selectedGroup"
      :items="groupList"
      item-text="name"
      item-value="id"
      label="Выберите группу"
      outlined
      dense
      @change="loadStudents"
    ></v-select>
    <v-btn class="draw__button" @click="getWinner">Выбрать победителя</v-btn>
    <v-progress-circular
      class="draw__progress"
      v-if="progress"
      :size="100"
      color="purple"
      indeterminate
    ></v-progress-circular>
    <v-alert class="draw__alert" v-if="winnerSelected" type="success"
      >Победитель: {{ winner.name }}</v-alert
    >
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Back from "../components/Back";
export default {
  name: "Draw",
  components: {
    Back,
  },
  data() {
    return {
      selectedGroup: "",
      winnerSelected: false,
      winner: null,
      progress: false,
      drawList: [],
    };
  },
  methods: {
    getWinner() {
      this.winner = null;
      this.winnerSelected = false;
      this.progress = true;
      setTimeout(() => {
        this.winnerSelected = true;
        this.progress = false;
        let winnerInd = this.randomInteger(0, this.studentList.length - 1);
        this.winner = this.studentList[winnerInd];
      }, 3000);
    },
    /* Set selected group ID to global store */
    setUpSelectedGroup() {
      this.$store.commit("setSelectedGroup", this.selectedGroup);
    },
    /* Get students obj from db  */
    loadStudents() {
      let group = this.selectedGroup;
      this.$store.dispatch("getStudentListFromDB", { group });
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
    createDrawList(students) {
      let tempArr = [];
      this.drawList.length = 0;
      for (let key in students) {
        tempArr.push({
          id: key,
          name: students[key].personName,
          finiki: this.computeFiniks(students[key].finiki),
        });
      }
      let resultArr = [];
      tempArr.forEach((student) => {
        for (let i = 0; i < student.finiki; i++) {
          resultArr.push({
            name: student.name,
            id: student.id,
          });
        }
      });

      return resultArr;
    },
    computeFiniks(finiks) {
      this.finikSumm = 0;
      for (let finik in finiks) {
        this.finikSumm += parseInt(finiks[finik].count);
      }
      return this.finikSumm;
    },
    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
  },
  computed: {
    groupList() {
      return this.convertGroupListToArray(this.$store.getters.groupList);
    },
    studentList() {
      return this.createDrawList(this.$store.getters.students);
    },
  },
};
</script>

<style lang="scss">
.draw {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__progress {
    margin: 1rem 0;
  }
  &__button {
    margin: 1rem 0;
  }
  &__alert {
    width: 90%;
  }
}
</style>