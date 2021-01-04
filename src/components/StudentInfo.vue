<template>
  <div class="student-info">
    <h3 class="student-info__name">
      Студент:
      {{ studentInfo.personName }}
    </h3>
    <p v-if="!studentInfo">{{ defaultText }}</p>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Кол-во фиников</th>
          <th class="text-left">Комментарий</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, ind) in studentInfo.finiki" :key="ind">
          <td>{{ student.count }}</td>
          <td>{{ student.comment }}</td>
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