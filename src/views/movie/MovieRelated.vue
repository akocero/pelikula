<template>
	<div class="related-movies" v-if="movies">
		<h4 class="related-movies__title">{{ title }}</h4>
		<div class="related-movies__list" v-if="movies">
			<!-- <pre>{{ movies }}</pre> -->
			<div
				class="related-movies__item"
				v-for="movie in movies"
				:key="movie.id"
			>
				<div class="card">
					<div class="card__img">
						<img
							:src="
								request.posterImagePaths.w150 +
									movie.poster_path
							"
							alt=""
						/>
					</div>

					<div class="card__body">
						<h4
							class="card__title card__title--clickable"
							@click="handleClick(movie.id)"
						>
							{{ movie.title }} ({{
								movie.release_date?.substr(0, 4)
							}})
						</h4>
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
	name: "MovieList",
	components: {},
	props: ["movies", "title"],
	emits: ["relatedMovieClick"],
	setup(props, { emit }) {
		console.log("movieslist", props.movies);
		// const limitCasts = computed(() => {
		// 	const limitToShow = 12;
		// 	if (props.credits) {
		// 		return props.credits.filter(
		// 			(item, index) => index < limitToShow
		// 		);
		// 	}
		// });

		const handleClick = (movie_id) => {
			emit("relatedMovieClick", movie_id);
		};

		return { request, handleClick };
	},
};
</script>

<style></style>
