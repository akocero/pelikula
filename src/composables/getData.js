import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getData = (collection) => {

    const data = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetch = async () => {
        loading.value = true
        try {
            const res = await projectFirestore.collection(collection).get()
            console.log(res.docs)
            data.value = res.docs.map(doc => {
               return { ...doc.data(), id: doc.id }
            })
            console.log(data.value)
            // data.value = res.data
            loading.value = false
           return res.data
        }
        catch (err) {
            loading.value = false
            console.log(err.message)
        }
    }

    return { data, error, fetch, loading }
}

export default getData
