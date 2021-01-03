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
      const currentUser = firebase.auth().currentUser.uid;
      await firebase.database().ref(`/users/${currentUser}/groups/${selectedGroup}/students`).push({
        personName
      })
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