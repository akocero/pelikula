import { ref } from "vue";
import axios from "@/axios";
import Cookies from "js-cookie";

const getGenres = () => {
	const genres = ref(null);
	const loading = ref(false);
	const error = ref(null);

	const fetchGenres = async (url) => {
		loading.value = true;
		if (!Cookies.get("genres")) {
			console.log("genres is fetch from TMDB API");
			try {
				const res = await axios.get(url);
				Cookies.set("genres", JSON.stringify(res.data.genres), {
					expires: 1,
				});
				genres.value = res.data.genres;
				console.log(res.data);
				return res.data;
			} catch (err) {
				console.log(err.message);
			} finally {
				loading.value = false;
			}
		} else {
			genres.value = JSON.parse(Cookies.get("genres"));
			loading.value = false;

			console.log("genres is fetch from cookies");
		}
	};

	return { genres, error, fetchGenres, loading };
};

export default getGenres;
