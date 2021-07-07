import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const user = ref(projectAuth.currentUser)

projectAuth.onAuthStateChanged((_user) => {
   console.log('user state chagen user is: ', _user)
   user.value = _user
});

const getUser = () => {
   return { user }
}

export default getUser