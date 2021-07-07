import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)
const loading = ref(false)

const signup = async (data) => {
   error.value = null
   loading.value = true
   try {
      const res = await projectAuth.createUserWithEmailAndPassword(data.email, data.password)

      if(!res) {
         throw Error('Could not sign up')
      }

      await res.user.updateProfile({ displayName: data.displayName })
      loading.value = false
      error.value = null
      console.log(res.user)
      return res
   } catch (err) {
      loading.value = false
      error.value = err.message
      console.log(err.message)
   }
}

const useSignup = () => {
   return  { error, loading, signup }
}

export default useSignup