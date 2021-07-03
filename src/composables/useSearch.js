import { ref } from 'vue'
import axios from '@/axios'
import request from '@/axios/request'

const data = ref([])
const error = ref(null)
const loading = ref(false)
const totalPages = ref(0)

const fetch = async (q, pageNumber) => {
    // data.value = []
    loading.value = true

    try {
        const res = await axios.get(`${request.search}${q}&page=${pageNumber}`);
        if(pageNumber === 1){
            data.value = res.data.results
        }else{
            data.value = [...data.value, ...res.data.results] 
        }
        
        totalPages.value = res.data.total_pages
        loading.value = false
        error.value = null
        return res.data
    } catch (err) {
        loading.value = false
        error.value = 'Data Fetching Error'
        console.log(err);
    }

}

const useSearch = () => {
    return { data, error, fetch, loading, totalPages }
}

export default useSearch