import { ref } from 'vue'
import axios from '@/axios'

const data = ref([])
const error = ref(null)
const isPending = ref(false)

const fetch = async (url) => {
    // data.value = []
    isPending.value = true

    try {
        const res = await axios.get(url);
        data.value = res.data
        console.log(res.data)
        isPending.value = false
        error.value = null
        return res.data
    } catch (err) {
        isPending.value = false
        error.value = 'Data Fetching Error'
        console.log(err);
    }

}

const useFetch = () => {
    return { data, error, fetch, isPending }
}

export default useFetch


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useData = (url) => {

//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     // const [error, setError] = useState(null);

//     useEffect(() => {
//         const abortCont = new AbortController();

//         axios(url, { signal: abortCont.signal })
//             .then(response => {

//                 setData(response.data);
//                 setIsLoading(false);

//             }).catch(err => {
//                 if (err.name === 'AbortError') {
//                     console.log('Fetch Aborted');
//                 }
//             });


//         return () => abortCont.abort();

//     }, [url]);


//     return { data, isLoading };
// }

// export default useData;