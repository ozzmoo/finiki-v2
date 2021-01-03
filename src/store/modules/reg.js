/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
export default {
  actions: {
    async registration(ctx, {
      email,
      password,
      name
    }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const currentUser = await firebase.auth().currentUser
        await firebase.database().ref(`/users/${currentUser.uid}/`).set({
          name
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
}