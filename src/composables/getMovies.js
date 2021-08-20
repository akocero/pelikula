import { ref } from "vue";
import axios from "@/axios";

const getMovies = () => {
	const movies = ref(null);
	const isPending = ref(false);
	const error = ref(null);

	const load = async (url) => {
		isPending.value = true;
		try {
			const res = await axios.get(url);

			movies.value = res.data;
			return res.data;
		} catch (err) {
			console.log(err.message);
		} finally {
			isPending.value = false;
		}
	};

	return { movies, error, load, isPending };
};

export default getMovies;
