<template>
	<div class="discover" v-if="movies && !isPending">
		<h4 class="discover__title">{{ title }}</h4>
		<div class="discover__list" v-if="movies">
			<div
				v-for="movie in movies.results"
				:key="movie.id"
				class="discover__poster"
			>
				<router-link :to="{ name: 'movie', params: { id: movie.id } }">
					<img :src="request.imagePath + movie.poster_path" alt="" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import getMovies from "@/composables/getMovies";
import request from "@/axios/request";
import { onBeforeMount, ref } from "vue";

export default {
	name: "Discover",
	props: {
		url: String,
		title: String,
	},
	setup(props) {
		const url = ref(props.url);
		const { movies, error, load, isPending } = getMovies(url.value);

		onBeforeMount(async () => {
			await load();
		});

		return { movies, error, request, isPending };
	},
};
</script>

<style></style>
