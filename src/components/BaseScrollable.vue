<template>
	<div class="scrollable" v-if="movies">
		<h4 class="scrollable__title">{{ title }}</h4>
		<div class="scrollable__list" v-if="movies">
			<!-- <pre>{{ movies }}</pre> -->
			<div
				class="scrollable__item scrollable__item--related-movies"
				v-for="movie in movies"
				:key="movie.id"
			>
				<div class="card">
					<div class="card__img">
						<img
							v-if="!movie.poster_path"
							src="https://via.placeholder.com/150x225/3F3F3F/FFFFFF/?text=Poster N/A"
							alt=""
						/>
						<img
							v-if="movie.poster_path"
							:src="
								request.image_path.poster.w150 +
									movie?.poster_path
							"
							alt=""
						/>
					</div>

					<div class="card__body">
						<router-link
							class="card__title card__title--clickable"
							:to="{ name: 'movie', params: { id: movie.id } }"
						>
							{{ movie.title }} ({{
								movie.release_date?.substr(0, 4)
							}})
						</router-link>
					</div>
				</div>
			</div>
			<!-- <div>View More</div> -->
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import { computed } from "@vue/runtime-core";
export default {
	name: "BaseScrollable",
	props: ["movies", "title"],
	setup(props) {
		// const limitedMovies = computed(() => {
		// 	return props.movies.slice(0, 11);
		// });
		return { request };
	},
};
</script>

<style></style>
