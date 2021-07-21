<template>
	<div class="discover" v-if="movies && !isPending">
		<h4 class="discover__heading">{{ title }}</h4>
		<div class="discover__list" v-if="movies">
			<div
				v-for="movie in movies.results"
				:key="movie.id"
				class="discover__poster"
			>
				<img
					:src="request.image_path.poster.w220 + movie.poster_path"
					alt=""
					@click="handleClick(movie)"
				/>
				<router-link
					:to="{ name: 'movie', params: { id: movie.id } }"
					class="discover__poster-title discover__poster-title--clickable"
				>
					{{ movie.title }}
					<span>({{ movie.release_date?.substr(0, 4) }})</span>
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
	emits: ["showModal"],
	setup(props, { emit }) {
		const url = ref(props.url);
		const { movies, error, load, isPending } = getMovies(url.value);

		onBeforeMount(async () => {
			await load();
			console.log(movies.value);
		});

		const handleClick = (movie) => {
			emit("showModal", movie);
		};

		return { movies, error, isPending, handleClick, request };
	},
};
</script>

<style></style>
