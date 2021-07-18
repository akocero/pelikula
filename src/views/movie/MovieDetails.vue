<template>
	<div class="movie-details">
		<div
			class="heading"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right, 
            rgba(0, 0, 0, 0.96),
            rgba(0, 0, 0, 0.65)), 
            url(${request.imagePathMd}${movie.backdrop_path})`,
				backgroundPosition: 'center center',
			}"
			v-if="!loading && movie"
		>
			<div class="heading__container">
				<div class="heading__poster">
					<img
						:src="request.imagePathSm + movie.poster_path"
						alt=""
					/>
				</div>
				<div class="heading__content">
					<h3 class="heading__title">
						{{ movie.title }}
						<span class="heading__title--year"
							>({{
								movie.release_date?.substr(0, 4) || "N/A"
							}})</span
						>
					</h3>

					<p class="heading__info row">
						{{ movie.release_date }} &#8226;
						<a
							href=""
							v-for="(genre, index) in movie.genres"
							:key="genre.id"
						>
							{{ genre.name
							}}<span v-if="index !== movie.genres.length - 1"
								>, {{
							}}</span>
						</a>
						&#8226; {{ movie.runtime }} mins
					</p>

					<div class="imdb-rating row">
						<img src="@/assets/imdb_logo.svg" alt="" />
						<p class="ml-1">{{ omdb?.imdbRating || "N/A" }}</p>
					</div>

					<div class="heading__actions row">
						<UserScore :percent="movie.vote_average" />
						<button class="btn-float">►</button>
						<button class="btn-float">❤</button>
						<button class="btn-float">⚑</button>
					</div>

					<h5 class="heading__tagline row" v-if="movie.tagline">
						"{{ movie.tagline }}"
					</h5>

					<p class="heading__overview row">
						{{ movie.overview }}
					</p>

					<ul class="heading__main-crew">
						<li v-for="crew in mainCrew" :key="crew.credit_id">
							<span class="heading__main-crew__name">{{
								crew.name
							}}</span>
							<br />
							<span class="heading__main-crew__job">{{
								crew.job
							}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="fade-effect"></div>
		<div class="row" v-if="movie">
			<MovieCast :credits="movie.credits" />
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import getMovie from "@/composables/getMovie";
import useOMDB from "@/composables/useOMDB";
import UserScore from "@/components/UserScore";
import MovieCast from "./MovieCast.vue";
import { useRoute } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
export default {
	name: "MovieDetails",
	components: {
		MovieCast,
		UserScore,
	},
	data() {
		return {
			request: request,
		};
	},
	setup() {
		const route = useRoute();
		const { error, movie, load } = getMovie(
			`movie/${route.params.id}?api_key=${request.apikey}&include_image_language=en,US&append_to_response=credits,videos,recommendations,similar_movies,images`
		);

		const { result: omdb, load: exec } = useOMDB();
		const loading = ref(false);

		onBeforeMount(async () => {
			loading.value = true;
			await load();
			await exec(movie.value.imdb_id);
			loading.value = false;
			console.log(movie.value.credits.crew[0]);
			// console.log("IMDB RATING", result.value.imdbRating);
		});

		// const mainCrew = computed(() => {
		// 	if (!loading) {
		// 		return movie.value.credits.crew.filter(
		// 			(item) => item.job === "Director"
		// 		);
		// 	}
		// });

		const mainCrew = computed(() => {
			const crewJobsToShow = [
				"Director",
				"Writer",
				// "Screenplay",
				"Story",
			];
			if (movie.value) {
				return movie.value.credits.crew.filter((item) =>
					crewJobsToShow.includes(item.job)
				);
			}
		});

		return { error, movie, omdb, loading, mainCrew };
	},
};
</script>

<style></style>
