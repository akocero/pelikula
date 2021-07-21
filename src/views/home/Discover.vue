<template>
	<div style="position: relative">
		<Loading
			v-model:active="isPending"
			color="#ededed"
			:width="100"
			:height="70"
			background-color="#000"
			:opacity="0"
			:is-full-page="false"
		/>
		<div class="discover" v-if="movies && !isPending">
			<h4 class="discover__heading">{{ title }}</h4>
			<div class="discover__list" v-if="movies">
				<div
					v-for="movie in movies.results"
					:key="movie.id"
					class="discover__poster"
				>
					<img
						:src="
							request.image_path.poster.w220 + movie.poster_path
						"
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
	</div>
</template>

<script>
import getMovies from "@/composables/getMovies";
import request from "@/axios/request";
import { onBeforeMount, ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
	name: "Discover",
	components: {
		Loading,
	},
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

		const fakeloader = ref(true);

		return { movies, error, isPending, handleClick, request, fakeloader };
	},
};
</script>

<style></style>
