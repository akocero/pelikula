<template>
	<div
		class="modal"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
            to right, 
            rgba(10,10,10, 0.6),
            transparent), 
            url(${request.image_path.backdrop.w780}${movie.backdrop_path})`,
			backgroundPosition: 'center center',
		}"
	>
		<button class="modal__button-close" @click="handleCloseModal">
			&#x2715;
		</button>

		<div class="modal__body" v-if="movie">
			<div class="modal__content">
				<h4 class="h4">
					{{ movie.title }} ({{ movie.release_date?.substr(0, 4) }})
				</h4>
				<transition name="fade">
					<label class="modal__genre" v-if="matchGenres">
						{{ movie.original_language.toUpperCase() }} |
						<router-link
							:to="{ name: 'genre', params: { id: genre.id } }"
							v-for="(genre, index) in matchGenres"
							:key="genre.id"
						>
							{{ genre.name
							}}<span v-if="index !== matchGenres.length - 1"
								>,
							</span>
						</router-link>
					</label>
				</transition>

				<div class="ratings mt-2 mb-2">
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
				<transition name="fade">
					<p class="p  mb-4 modal__plot" v-if="omdb">
						{{ omdb.Plot }}
					</p>
				</transition>
			</div>
			<router-link
				role="button"
				class="btn btn__sm modal__view-more container"
				:to="{ name: 'movie', params: { id: movie.id } }"
			>
				View More
			</router-link>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import feather from "feather-icons";
import useOMDB from "@/composables/useOMDB";
import getGenres from "@/composables/getGenres";
import { computed, onBeforeMount } from "@vue/runtime-core";

export default {
	name: "Modal",
	props: {
		movie: Object,
	},
	data() {
		return {
			request: request,
		};
	},
	computed: {
		iX: function() {
			return feather.icons["minimize"].toSvg({
				width: 18,
			});
		},
		iArrowRight: function() {
			return feather.icons["external-link"].toSvg({
				width: 18,
			});
		},
	},

	emits: ["closeModal"],
	setup(props, { emit }) {
		const { result: omdb, load: loadOmdb } = useOMDB();
		const { genres, fetchGenres } = getGenres();

		const handleCloseModal = () => {
			props.movie.value = null;
			emit("closeModal");
		};

		onBeforeMount(async () => {
			await loadOmdb(null, props.movie.title);
			await fetchGenres("/genre/movie/list?api_key=" + request.apikey);
			// console.log(omdb.value);
		});

		const matchGenres = computed(() => {
			// console.log("genressss", props.movie);
			if (genres.value) {
				return genres.value.filter((genre) => {
					return props.movie.genre_ids.includes(genre.id);
				});
			}
		});

		return { handleCloseModal, matchGenres, genres, omdb };
	},
};
</script>

<style></style>
