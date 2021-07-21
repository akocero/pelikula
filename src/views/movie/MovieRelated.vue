<template>
	<div class="scrollable" v-if="movies">
		<h4 class="scrollable__title">{{ title }}</h4>
		<div class="scrollable__list" v-if="movies">
			<!-- <pre>{{ movies }}</pre> -->
			<div
				class="scrollable__item scrollable__item--related-movies"
				v-for="movie in limitedMovies"
				:key="movie.id"
			>
				<div class="card">
					<div class="card__img">
						<img
							:src="
								request.image_path.poster.w150 +
									movie.poster_path
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
	name: "MovieRelated",
	components: {},
	data() {
		return {
			request: request,
		};
	},
	props: ["movies", "title"],
	setup(props) {
		const limitedMovies = computed(() => {
			const limitToShow = 12;
			if (props.movies) {
				return props.movies.filter(
					(item, index) => index < limitToShow
				);
			}
		});
		return { limitedMovies };
	},
};
</script>

<style></style>
