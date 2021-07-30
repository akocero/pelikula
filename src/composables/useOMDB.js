import { ref } from 'vue'
import axios from '@/axios'

const useOMDB = () => {

    const result = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const load = async (imdb_id) => {
        loading.value = true
        try {
            const res = await axios.get(`https://www.omdbapi.com/?i=${imdb_id}&apikey=${process.env.VUE_APP_OMDB_API_KEY}`);
            // console.log(res)
            result.value = res.data
            return res.data
        }
        catch (err) {
            console.log(err.message)
        } finally {
            loading.value = false
        }
    }

    return { result, error, load, loading }
}

export default useOMDB
