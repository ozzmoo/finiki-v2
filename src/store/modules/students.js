/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';

export default {
  state: {
    studentList: null,
    selectedGroup: '',
    studentInfo: null
  },
  actions: {

    async getStudentListFromDB(ctx, {
      group
    }) {
      const currentUser = firebase.auth().currentUser.uid;
      let studentList = null
      await firebase
        .database()
        .ref(`/users/${currentUser}/groups/${group}`)
        .once("value")
        .then((snapshot) => {
          studentList = snapshot.val().students;
        });
      ctx.commit('updateStudentList', studentList)
    },
    async removeStudent(ctx, {
      groupID,
      studentID
    }) {
      try {
        const currentUser = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/users/${currentUser}/groups/${groupID}/students/`).child(studentID).remove()
      } catch (error) {
        console.log(error)
      }
    },

    async addFiniks(ctx, {
      studentID,
      groupID,
      count,
      comment
    }) {
      try {
        const currentUser = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/users/${currentUser}/groups/${groupID}/students/${studentID}/finiki`).push({
          count,
          comment
        })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteFiniks(ctx, {
      groupID,
      studentID
    }) {
      console.log(groupID, studentID)
      try {
        const currentUser = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref(`/users/${currentUser}/groups/${groupID}/students/${studentID}/finiki`)
        ref.remove()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSelectedFiniks(ctx, {
      groupID,
      studentID,
      finikID
    }) {
      try {
        const currentUser = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref(`/users/${currentUser}/groups/${groupID}/students/${studentID}/finiki/${finikID}`)
        ref.remove()
      } catch (error) {
        console.log(error)
      }
    },
    async showStudentInfo(ctx, {
      groupID,
      studentID
    }) {
      const currentUser = firebase.auth().currentUser.uid;
      let studentInfo = null
      await firebase
        .database()
        .ref(`/users/${currentUser}/groups/${groupID}/students/${studentID}`)
        .once("value")
        .then((snapshot) => {
          studentInfo = snapshot.val();
        });
      ctx.commit('updateStudentInfo', {
        studentInfo,
        groupID,
        studentID
      })
    }
  },
  mutations: {
    updateStudentList(state, studentList) {
      state.studentList = studentList
    },
    setSelectedGroup(state, selectedGroup) {
      state.selectedGroup = selectedGroup
    },
    updateStudentInfo(state, studentInfo) {
      state.studentInfo = studentInfo
    }
  },
  getters: {
    students(state) {
      return state.studentList
    },
    studentInfo(state) {
      return state.studentInfo
    }
  }
}