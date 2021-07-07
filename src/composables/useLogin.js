import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)
const loading = ref(false)


const login = async (data) => {
   error.value = null
   loading.value = null
   try {
      const res = await projectAuth.signInWithEmailAndPassword(data.email, data.password)
      error.value = null
      loading.value = false
      console.log(res)
      return res

   } catch (err) {
      console.log(err.message)

      error.value = err.message
      loading.value = false
   }
}

const useLogin = () => {
   return { login, error, loading }
}

export default useLogin