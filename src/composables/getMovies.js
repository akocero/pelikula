import { ref } from 'vue'
import axios from '@/axios'

const getMovies = (url) => {

    const movies = ref(null)
    const isPending = ref(false)
    const error = ref(null)

    const load = async () => {
        isPending.value = true
        try {
            const res = await axios.get(url);
           
            console.log(res.data)
            movies.value = res.data
            isPending.value = false
           return res.data
        }
        catch (err) {
            isPending.value = false
            console.log(err.message)
        }
    }

    return { movies, error, load, isPending }
}

export default getMovies
