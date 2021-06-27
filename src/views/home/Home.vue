<template>
	<div class="home">
		<Heading v-if="movie" :movie="movie" />
		<Discover :url="request.trending" title="Trending Now" />
		<Discover :url="request.topRated" title="Top Rated" />
	</div>
</template>

<script>
import request from "@/axios/request";
import Discover from "@/views/home/Discover";
import Heading from "@/views/home/Heading";
import getMovies from "@/composables/getMovies";
import { onBeforeMount, ref } from "vue";

export default {
	name: "Home",
	components: {
		Discover,
		Heading,
	},
	setup() {
		const { movies, error, load, isPending } = getMovies(request.trending);
		const movie = ref(null);
		const loadMovie = async () => {
			await load();
			if (!error.value) {
				movie.value =
					movies.value?.results[
						Math.floor(
							Math.random() * movies.value.results.length - 1
						)
					];
			}
		};

		onBeforeMount(() => {
			loadMovie();
		});

		return { request, movies, error, isPending, movie };
	},
};
</script>
