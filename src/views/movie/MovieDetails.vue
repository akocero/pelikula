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
							{{ genre.name }}
							<span v-if="index !== movie.genres.length - 1"
								>,
							</span>
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
								TMDB Score
							</h4>
						</div>

						<!-- <button class="btn-float">❤</button>
						<button class="btn-float">⚑</button> -->
						<button
							v-if="movie.videos && movie.videos.results[0]"
							class="btn"
							@click="playTrailer(movie.videos.results[0])"
						>
							<i v-html="iPlay"></i> Trailer
						</button>
					</div>

					<h5 class="heading__tagline row" v-if="movie.tagline">
						"{{ movie.tagline }}"
					</h5>

					<p class="heading__overview row">
						{{ movie.overview }}
					</p>

					<ul class="heading__main-crew grid grid--4 grid__sm--2">
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
		<div class="flex-row container">
			<div class="col-9 col-sm-8 col-xs-12">
				<div class="row" v-if="movie">
					<BaseScrollable
						title="Top Billed Cast"
						:data="movie.credits.cast"
						type="credits"
						:limit="12"
					/>
				</div>
				<div class="row">
					<BaseScrollable
						title="Director, Story, Writer"
						:data="mainCrew"
						type="credits"
						:limit="10"
					/>
				</div>
			</div>
			<div class="col-3 col-sm-4 col-xs-12 right">
				<div class="row" v-if="movie.homepage">
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
