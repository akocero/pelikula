<template>
	<Loading
		v-model:active="loading"
		:is-full-page="true"
		color="#ededed"
		loader="bars"
		:width="200"
		:height="150"
		background-color="#000"
		:opacity="0.95"
		:lock-scroll="true"
	/>
	<div class="movie-details" v-if="!loading && movie">
		<ModalTrailer
			v-if="showTrailer"
			@closeTrailer="showTrailer = false"
			:trailerLink="trailerLink"
		/>
		<div
			class="heading"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `url(${request.image_path.backdrop.w1280}${movie.backdrop_path})`,
				backgroundPosition: 'center center',
			}"
			v-if="!loading && movie"
		>
			<div class="heading__container">
				<!-- <div class="heading__poster">
					<img
						:src="
							request.image_path.poster.w300 + movie.poster_path
						"
						alt=""
					/>
				</div> -->

				<div class="heading__content">
					<div
						class="heading__img-container"
						v-if="movie.images.logos.length"
					>
						<img
							:src="
								`${request.image_path.logo.w500}${movie.images.logos[0].file_path}`
							"
							alt=""
							:style="{
								width: 'unset',
								maxWidth: '100%',
								maxHeight: '30vh',
								aspectRatio: movie.images.logos[0].aspect_ratio,
							}"
							class="mb-5"
						/>
					</div>

					<h1 class="h3">
						{{ movie.title }}
					</h1>

					<label class="heading__info">
						{{ movie.release_date?.substr(0, 4) }} |
						<a
							href=""
							v-for="(genre, index) in movie.genres"
							:key="genre.id"
						>
							{{ genre.name }}
							<span v-if="index !== movie.genres.length - 1"
								>,
							</span>
						</a>
						| {{ movie.runtime }} mins
					</label>

					<div class="imdb-rating mb-2 mt-2">
						<img src="@/assets/imdb_logo.svg" alt="" />
						<h4 class="ml-1">{{ omdb?.imdbRating || "N/A" }}</h4>
					</div>

					<!-- <div class="heading__actions mb-3">
						<div class="user-score__container">
							<UserScore :percent="movie.vote_average" />
							<h4 style="max-width: 40px;">
								TMDB Score
							</h4>
						</div> -->

					<!-- <button class="btn-float">❤</button>
						<button class="btn-float">⚑</button> -->
					<!-- <button
							v-if="movie.videos && movie.videos.results[0]"
							class="btn"
							@click="playTrailer(movie.videos.results[0])"
						>
							<i v-html="iPlay"></i> Trailer
						</button>
					</div> -->

					<p class="p">
						{{ omdb.Plot }}
						<!-- {{ movie.overview }} -->
					</p>
				</div>
			</div>
		</div>
		<div class="fade-effect"></div>
		<div class="flex-row container">
			<div class="col-9 col-sm-8 col-xs-12">
				<div class="mb-2" v-if="movie">
					<BaseScrollable
						title="Top Billed Cast"
						:data="movie.credits.cast"
						type="credits"
						:limit="12"
					/>
				</div>
				<div class="mb-2">
					<BaseScrollable
						title="Director, Story, Writer"
						:data="mainCrew"
						type="credits"
						:limit="10"
					/>
				</div>
				<MovieTrailers
					:videos="movie.videos.results"
					@playTrailer="playTrailer($event)"
				/>
			</div>
			<div class="col-3 col-sm-4 col-xs-12 right">
				<div class="mb-2" v-if="movie.homepage">
					<MovieExternalID
						:external_ids="movie?.external_ids || null"
						:homepage="movie?.homepage || null"
					/>
				</div>
				<div class="mb-2">
					<MovieMoreInfo :movie="movie" />
				</div>
				<div class="mb-2">
					<MovieCollection :movie="movie" :request="request" />
				</div>
			</div>
		</div>
		<div class="container" v-if="movie.similar_movies.results.length">
			<BaseScrollable
				title="Similar Movies"
				:data="movie.similar_movies.results"
				type="movies"
				:limit="12"
			/>
		</div>
		<div class="container" v-if="movie.recommendations.results.length">
			<BaseScrollable
				title="Suggested Movies"
				:data="movie.recommendations.results"
				type="movies"
				:limit="12"
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
import MovieMoreInfo from "./MovieMoreInfo.vue";
import ModalTrailer from "./ModalTrailer.vue";
import MovieExternalID from "./MovieExternalID.vue";
import MovieTrailers from "./MovieTrailers.vue";
import MovieCollection from "./MovieCollection.vue";
import BaseScrollable from "@/components/BaseScrollable";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import feather from "feather-icons";

export default {
	name: "MovieDetails",
	components: {
		UserScore,
		MovieExternalID,
		MovieMoreInfo,
		MovieCollection,
		ModalTrailer,
		Loading,
		BaseScrollable,
		MovieTrailers,
	},
	data() {
		return {
			request: request,
		};
	},
	computed: {
		iPlay: function() {
			return feather.icons["play"].toSvg({
				width: 14,
				fill: "#fff",
				color: "#fff",
			});
		},
		iAward: function() {
			return feather.icons["activity"].toSvg({
				width: 14,
			});
		},
	},
	setup() {
		const route = useRoute();
		const { error, movie, load } = getMovie();
		const { result: omdb, load: loadOmdb } = useOMDB();
		const { showTrailer, playTrailer, trailerLink } = useModalTrailer();
		const loading = ref(false);

		onBeforeMount(async () => {
			await loadContent(route.params.id);
			console.log(movie.value);
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

		const loadingings = ref(true);

		const loadContent = async (id) => {
			loading.value = true;
			await load(
				`movie/${id}?api_key=${request.apikey}&include_image_language=en,US&append_to_response=credits,videos,recommendations,similar_movies,images,external_ids`
			);
			await loadOmdb(movie.value.imdb_id);
			console.log(omdb.value);
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
			loadingings,
		};
	},
};
</script>

<style></style>
