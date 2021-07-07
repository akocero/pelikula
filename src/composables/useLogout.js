import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const error = ref(null)
const loading = ref(false)

const logout = async () => {
   error.value = null
   loading.value = null
   try {
      await projectAuth.signOut()
      error.value = null
      loading.value = false
   } catch (err) {
      console.log(err.message)

      error.value = err.message
      loading.value = false
   }
}

const useLogout = () => {
   return { logout, error, loading }
}

export default useLogout