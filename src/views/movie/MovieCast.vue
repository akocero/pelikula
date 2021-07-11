<template>
	<div class="movie-cast" v-if="!isPending">
		<h4 class="movie-cast__title">Top Billed Cast</h4>
		<div class="movie-cast__list" v-if="credits">
			<div
				class="movie-cast__item"
				v-for="cast in limitCasts"
				:key="cast.cast_id"
			>
				<div class="card">
					<div class="card__img">
						<img
							:src="request.imagePaths.w138 + cast.profile_path"
							alt=""
						/>
					</div>

					<div class="card__body">
						<h4 class="card__sub-title">{{ cast.name }}</h4>
						<h4 class="card__title">{{ cast.character }}</h4>
					</div>
				</div>
			</div>
			<div>View More</div>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import getMovies from "@/composables/getMovies";
import { computed, onBeforeMount } from "@vue/runtime-core";
export default {
	name: "MovieCast",
	components: {},
	props: ["movie_id"],
	setup(props) {
		const { movies: credits, isPending, error, load } = getMovies(
			`movie/${props.movie_id}/credits?api_key=${request.apikey}&language=en-US`
		);

		onBeforeMount(async () => {
			await load();
			console.log(credits.value);
		});

		const limitCasts = computed(() => {
			const limitToShow = 12;
			if (credits.value) {
				return credits.value.cast.filter(
					(item, index) => index < limitToShow
				);
			}
		});

		return { request, credits, isPending, error, limitCasts };
	},
};
</script>

<style></style>
