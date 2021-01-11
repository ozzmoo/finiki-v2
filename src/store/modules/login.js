/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';

export default {
  actions: {
    async login(ctx, {
      email,
      password
    }) {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        console.log(e)
      }
    },
    async loginWithGoogle() {
      try {

        const provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider)
        let resuilt = await firebase.auth().signInWithPopup(provider)
        console.log(resuilt)
      } catch (e) {
        console.log(e)
      }

    }
  }
}