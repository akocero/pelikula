<template>
	<div class="discover">
		<h4 class="discover__title">{{ title }}</h4>
		<div class="discover__list" v-if="movies">
			<div
				v-for="movie in movies.results"
				:key="movie.id"
				class="discover__poster"
			>
				<img :src="request.imagePath + movie.poster_path" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import getMovies from "@/composables/getMovies";
import request from "@/axios/request";

export default {
	name: "Discover",
	props: {
		url: String,
		title: String,
	},
	setup(props) {
		const { movies, error, load } = getMovies(props.url);

		load();

		return { movies, error, request };
	},
};
</script>

<style></style>
