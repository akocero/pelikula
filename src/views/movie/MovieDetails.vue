<template>
	<transition
		@before-enter="backdropInit"
		@enter="backdropAnim"
		@leave="backdropLeave"
	>
		<div class="modal__backdrop" v-if="showModal"></div>
	</transition>
	<transition
		@before-enter="modalInit"
		@enter="modalAnim"
		@leave="modalLeave"
	>
		<Modal
			:movie="modalContent"
			v-if="showModal"
			@closeModal="handleCloseModal"
		/>
	</transition>
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
			class="mobile__hero-image"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `url(${request.image_path.backdrop.w780}${movie.backdrop_path})`,
				backgroundPosition: 'top center',
			}"
			v-if="!loading && movie"
		></div>
		<div
			class="heading"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `url(${request.image_path.backdrop.w1280}${movie.backdrop_path})`,
				backgroundPosition: 'top center',
			}"
			v-if="!loading && movie"
		>
			<div class="heading__container">
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
								aspectRatio: movie.images.logos[0].aspect_ratio,
							}"
							class=""
						/>
					</div>

					<h1 class="h3 heading__title">
						{{ movie.title }}
					</h1>

					<label class="heading__info">
						{{ movie.release_date?.substr(0, 4) }} |
						<router-link
							:to="{ name: 'genre', params: { id: genre.id } }"
							v-for="(genre, index) in movie.genres"
							:key="genre.id"
						>
							{{ genre.name }}
							<span v-if="index !== movie.genres.length - 1"
								>&#9702;
							</span>
						</router-link>
						|
						<span class="heading__info--runtime">{{
							minutesToHours(movie.runtime)
						}}</span>
					</label>

					<div class="heading__actions mb-2 mt-2">
						<div class="ratings">
							<div class="ratings__imdb">
								<img src="@/assets/imdb_logo.svg" alt="" />
								<span class="ml-1">
									{{ omdb?.imdbRating || "N/A" }}
								</span>
							</div>
							<div class="ratings__tmdb">
								<img src="@/assets/tmdb.svg" alt="" />
								<span class="ml-1">
									{{ movie.vote_average || "N/A" }}
								</span>
							</div>
						</div>
						<!-- <button class="btn-float">❤</button>
						<button class="btn-float">⚑</button> -->
						<button
							v-if="movie.videos && movie.videos.results.length"
							class="btn btn__trailer"
							@click="
								playTrailer(
									trailer() || movie.videos.results[0]
								)
							"
						>
							<i v-html="iPlay"></i> Random Trailer
						</button>
					</div>

					<p class="p movie-details__plot mb-2">
						{{ omdb.Plot }}
					</p>
				</div>
			</div>
		</div>
		<div class="fade-effect hide-on-mobile"></div>
		<div class="container">
			<MovieMoreInfo :movie="movie" />
		</div>

		<div class="mb-2 container" v-if="movie">
			<BaseScrollable
				title="Top Billed Cast"
				:data="movie.credits.cast"
				type="credits"
				:limit="12"
			/>
		</div>

		<div class="pb-4 container flex-row">
			<div class="col-6 col-sm-12">
				<div class="movie-details__story-line">
					<h2 class="h2 mb-1">Story Line</h2>
					<p class="p">
						{{ movie.overview }}
					</p>
				</div>
			</div>
			<div class="col-6 col-sm-12">
				<BaseScrollable
					title="Director, Story, Writer"
					:data="mainCrew"
					type="credits"
					:limit="10"
				/>
			</div>
		</div>
		<div class="mb-5" v-if="movie.belongs_to_collection">
			<MovieCollection
				@showModal="handleShowModal($event)"
				:id="movie.belongs_to_collection.id"
				:request="request"
			/>
		</div>
		<div class="movie-details__media container">
			<div class="movie-details__media-heading">
				<h2 class="mr-5">Media</h2>
				<div class="movie-details__media-actions">
					<button
						v-for="(mediaItem, index) in media"
						:key="index"
						class="btn btn__sm mr-1"
						:class="{ 'btn--active': mediaItem.active }"
						@click="handleShowMedia(mediaItem.name)"
					>
						{{ mediaItem.name }}
						<span v-if="mediaItem.name === 'Videos'">
							{{ movie.videos?.results?.length }}
						</span>
						<span v-if="mediaItem.name === 'Posters'">
							{{ movie.images.posters?.length }}
						</span>
						<span v-if="mediaItem.name === 'Backdrops'">
							{{ movie.images.backdrops?.length }}
						</span>
					</button>
				</div>
			</div>

			<MovieTrailers
				v-if="media[0].active"
				:videos="movie.videos.results"
				@playTrailer="playTrailer($event)"
			/>
			<MovieImages
				v-if="media[1].active"
				:images="movie.images.posters"
				type="poster"
			/>
			<MovieImages
				v-if="media[2].active"
				:images="movie.images.backdrops"
				type="backdrop"
			/>
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
import MovieImages from "./MovieImages.vue";
import MovieCollection from "./MovieCollection.vue";
import BaseScrollable from "@/components/BaseScrollable";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import feather from "feather-icons";
import Modal from "@/components/Modal";
import useModal from "@/composables/useModal";

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
		MovieImages,
		Modal,
	},
	data() {
		return {
			request: request,
		};
	},
	computed: {
		iPlay: function() {
			return feather.icons["play"].toSvg({
				width: 16,
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
		const {
			modalContent,
			showModal,
			handleShowModal,
			handleCloseModal,
			backdropAnim,
			backdropInit,
			backdropLeave,
			modalInit,
			modalAnim,
			modalLeave,
		} = useModal();
		const loading = ref(false);

		const media = ref([
			{ name: "Videos", active: true },
			{ name: "Posters", active: false },
			{ name: "Backdrops", active: false },
		]);

		const handleShowMedia = (mediaItem) => {
			media.value.forEach((item) => {
				mediaItem === item.name
					? (item.active = true)
					: (item.active = false);
			});
		};

		onBeforeMount(async () => {
			await loadContent(route.params.id);
			// console.log(movie.value);
		});

		onBeforeRouteUpdate(async (to, from, next) => {
			await loadContent(to.params.id);
			next();
		});

		const mainCrew = computed(() => {
			const crewJobsToShow = [
				"Director",
				"Writer",
				"Screenplay",
				"Story",
			];
			if (movie.value) {
				return movie.value.credits.crew.filter((item) =>
					crewJobsToShow.includes(item.job)
				);
			}
		});

		const trailer = () => {
			if (movie.value) {
				const trailers = movie.value.videos.results.filter(
					(trailer) => trailer.type === "Trailer"
				);
				// Math.random() * trailers.length
				return trailers[Math.floor(Math.random() * trailers.length)];
			}
		};

		const loadingings = ref(true);

		const loadContent = async (id) => {
			loading.value = true;
			await load(
				`movie/${id}?api_key=${request.apikey}&include_image_language=en,US&append_to_response=credits,videos,recommendations,similar_movies,images,external_ids,collections`
			);
			await loadOmdb(movie.value.imdb_id);
			// console.log(omdb.value);
			loading.value = false;

			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 500);
		};

		const minutesToHours = (n) => {
			var num = n;
			var hours = num / 60;
			var rhours = Math.floor(hours);
			var minutes = (hours - rhours) * 60;
			var rminutes = Math.round(minutes);
			return rhours + "h " + rminutes + "m";
			// console.log(n);
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
			trailer,
			loadingings,
			media,
			handleShowMedia,
			minutesToHours,

			modalContent,
			showModal,
			backdropAnim,
			backdropInit,
			modalInit,
			modalAnim,
			handleCloseModal,
			handleShowModal,
			backdropLeave,
			modalLeave,
		};
	},
};
</script>

<style></style>
