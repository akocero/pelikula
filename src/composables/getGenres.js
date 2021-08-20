import { ref } from "vue";
import axios from "@/axios";

const getGenres = () => {
	const genres = ref(null);
	const loading = ref(false);
	const error = ref(null);

	const fetchGenres = async (url) => {
		loading.value = true;
		try {
			const res = await axios.get(url);

			genres.value = res.data.genres;
			console.log(res.data);
			return res.data;
		} catch (err) {
			console.log(err.message);
		} finally {
			loading.value = false;
		}
	};

	return { genres, error, fetchGenres, loading };
};

export default getGenres;
