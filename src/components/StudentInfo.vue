<template>
  <div class="student-info">
    <h3 class="student-info__name">
      Студент:
      {{ studentInfo.studentInfo.personName }}
    </h3>
    <p v-if="!studentInfo">{{ defaultText }}</p>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Кол-во фиников</th>
          <th class="text-left">Комментарий</th>
          <th class="text-left">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, ind) in studentInfo.studentInfo.finiki" :key="ind">
          <td>{{ student.count }}</td>
          <td>{{ student.comment }}</td>
          <td>
            <v-btn
              @click="
                deleteSelectedFiniks(
                  studentInfo.groupID,
                  studentInfo.studentID,
                  ind
                )
              "
              icon
              small
            >
              <v-icon color="red"> mdi-trash-can-outline </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "StudentInfo",
  data() {
    return {
      defaultText: "Пожалуйста, выберите группу",
    };
  },
  methods: {
    deleteSelectedFiniks(groupID, studentID, finikID) {
      this.$store.dispatch("deleteSelectedFiniks", {
        groupID,
        studentID,
        finikID,
      });
      this.updateStudentInfo(groupID, studentID);
    },
    updateStudentInfo(groupID, studentID) {
      this.$store.dispatch("showStudentInfo", { groupID, studentID });
    },
  },
  computed: {
    studentInfo() {
      return this.$store.getters.studentInfo
        ? this.$store.getters.studentInfo
        : { personName: "Неизвестный студент" };
    },
  },
};
</script>

<style scoped>
</style>