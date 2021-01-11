/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';

export default {
  state: {
    groupList: [],
  },
  actions: {
    async addGroup(ctx, groupName) {
      if (groupName != "") {
        const currentUser = firebase.auth().currentUser;
        await firebase.database().ref(`/users/${currentUser.uid}/groups/`).push({
          groupName
        })
      } else {
        alert("Введите название группы")
      }
    },
    async removeGroup(ctx, {
      groupID
    }) {
      try {
        const currentUser = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/users/${currentUser}/groups/`).child(groupID).remove()
      } catch (error) {
        console.log(error)
      }
    },
    async getGroupListFromDB(ctx) {
      const currentUser = await firebase.auth().currentUser.uid;
      let groupList = null
      await firebase
        .database()
        .ref("/users/" + currentUser)
        .once("value")
        .then((snapshot) => {
          groupList = snapshot.val().groups;
        });
      ctx.commit('updateGroupList', groupList)
    },

    async addPersonToGroup(ctx, {
      personName,
      selectedGroup
    }) {
      if (personName != "") {
        const currentUser = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/users/${currentUser}/groups/${selectedGroup}/students`).push({
          personName
        })
      } else {
        alert("Введите имя студента")
      }
    }

  },
  mutations: {
    updateGroupList(state, groupList) {
      state.groupList = groupList
    },

  },
  getters: {
    groupList(state) {
      return state.groupList
    }
  }
}