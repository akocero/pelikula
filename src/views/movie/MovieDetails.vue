<template>
	<div class="movie-details" v-if="!loading && movie">
		<!-- padding-bottom: 56.25%; -->
		<ModalTrailer
			v-if="showTrailer"
			@closeTrailer="showTrailer = false"
			:trailerLink="trailerLink"
		/>
		<div
			class="heading"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right, 
            rgba(0, 0, 0, 0.96),
            rgba(0, 0, 0, 0.65)), 
            url(${request.image_path.backdrop.w1280}${movie.backdrop_path})`,
				backgroundPosition: 'center center',
			}"
			v-if="!loading && movie"
		>
			<div class="heading__container">
				<div class="heading__poster">
					<img
						:src="
							request.image_path.poster.w300 + movie.poster_path
						"
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

					<p class="heading__info">
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
						<div class="user-score__container">
							<UserScore :percent="movie.vote_average" />
							<h4 style="max-width: 40px;">
								User Score
							</h4>
						</div>
						<button
							v-if="movie.videos && movie.videos.results[0]"
							class="btn-float"
							@click="playTrailer(movie.videos.results[0])"
						>
							►
						</button>
						<button class="btn-float">❤</button>
						<button class="btn-float">⚑</button>
					</div>

					<h5 class="heading__tagline row" v-if="movie.tagline">
						"{{ movie.tagline }}"
					</h5>

					<p class="heading__overview row">
						{{ movie.overview }}
						<!-- Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Repellendus, iste? -->
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
		<div class="grid">
			<div class="col">
				<div class="row" v-if="movie">
					<MovieCredits
						:credits="movie.credits.cast"
						title="Top Billed Cast"
					/>
				</div>
				<div class="row">
					<MovieCredits
						:credits="mainCrew"
						title="Director, Story, Writer"
					/>
				</div>
			</div>
			<div class="col">
				<div class="row" v-if="movie?.external_ids || movie.homepage">
					<MovieExternalID
						:external_ids="movie?.external_ids || null"
						:homepage="movie?.homepage || null"
					/>
				</div>
				<div class="row">
					<MovieMoreInfo :movie="movie" />
				</div>
				<div class="row">
					<MovieCollection :movie="movie" :request="request" />
				</div>
			</div>
		</div>
		<div class="row" v-if="movie.similar_movies.results.length">
			<MovieRelated
				:movies="movie.similar_movies.results"
				title="Similar Movies"
			/>
		</div>
		<div class="row" v-if="movie.recommendations.results.length">
			<MovieRelated
				:movies="movie.recommendations.results"
				title="Suggested Movies"
			/>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import getMovie from "@/composables/getMovie";
import useModalTrailer from "@/composables/useModalTrailer";
import useOMDB from "@/composables/useOMDB";
import UserScore from "@/components/UserScore";
import MovieCredits from "./MovieCredits.vue";
import MovieRelated from "./MovieRelated.vue";
import MovieMoreInfo from "./MovieMoreInfo.vue";
import ModalTrailer from "./ModalTrailer.vue";
import MovieExternalID from "./MovieExternalID.vue";
import MovieCollection from "./MovieCollection.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";

export default {
	name: "MovieDetails",
	components: {
		MovieCredits,
		UserScore,
		MovieRelated,
		MovieExternalID,
		MovieMoreInfo,
		MovieCollection,
		ModalTrailer,
	},
	data() {
		return {
			request: request,
		};
	},
	setup() {
		const route = useRoute();
		const { error, movie, load } = getMovie();
		const { result: omdb, load: loadOmdb } = useOMDB();
		const { showTrailer, playTrailer, trailerLink } = useModalTrailer();
		const loading = ref(false);

		onBeforeMount(async () => {
			await loadContent(route.params.id);
		});

		onBeforeRouteUpdate(async (to, from, next) => {
			await loadContent(to.params.id);
			next();
		});

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

		const loadContent = async (id) => {
			loading.value = true;
			await load(
				`movie/${id}?api_key=${request.apikey}&include_image_language=en,US&append_to_response=credits,videos,recommendations,similar_movies,images`
			);
			await loadOmdb(movie.value.imdb_id);
			loading.value = false;
		};

		return {
			error,
			movie,
			omdb,
			loading,
			mainCrew,
			playTrailer,
			showTrailer,
			trailerLink,
		};
	},
};
</script>

<style></style>
