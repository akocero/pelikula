import { ref } from 'vue'
import axios from '@/axios'

const getMovie = () => {

    const movie = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const load = async (url) => {
        loading.value = true
        try {
            const res = await axios.get(url);
            movie.value = res.data
            loading.value = false
           return res.data
        }
        catch (err) {
            loading.value = false
            console.log(err.message)
        }
    }

    return { movie, error, load, loading }
}

export default getMovie
