/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';

export default {
  state: {
    studentList: null,
    selectedGroup: ''
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
        console.log(ref)
        ref.remove()
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    updateStudentList(state, studentList) {
      state.studentList = studentList
    },
    setSelectedGroup(state, selectedGroup) {
      state.selectedGroup = selectedGroup
    }
  },
  getters: {
    students(state) {
      return state.studentList
    }
  }
}