<template>
	<div class="movie-details">
		<div
			class="heading"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right, 
            rgba(0, 0, 0, 0.96),
            transparent), 
            url(${request.imagePathMd}${movie.backdrop_path})`,
				backgroundPosition: 'center center',
			}"
			v-if="movie"
		>
			<div class="heading__container">
				<div class="heading__poster">
					<img
						:src="request.imagePathSm + movie.poster_path"
						alt=""
					/>
				</div>
				<div class="heading__content">
					<h3 class="heading__title pb-1">
						{{ movie.title }} ({{
							movie.release_date.substr(0, 4)
						}})
					</h3>
					<p class="heading__info row">
						{{ movie.status }} | {{ movie.runtime }} mins
					</p>
					<ul class="heading__genre row">
						<li v-for="genre in movie.genres" :key="genre.id">
							{{ genre.name }}
						</li>
					</ul>
					<div class="imdb-rating row">
						4.0
					</div>

					<div class="heading__actions row">
						<button class="btn-float">►</button>
						<button class="btn-float">❤</button>
						<button class="btn-float">⚑</button>
					</div>
					<h5 class="heading__tagline row" v-if="movie.tagline">
						{{ movie.tagline }}
					</h5>
					<p class="heading__overview row">
						{{ movie.overview }}
					</p>
				</div>
			</div>
		</div>
		<div class="fade-effect"></div>
		<div class="row" v-if="movie">
			<MovieCast :movie_id="movie.id" />
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import getMovie from "@/composables/getMovie";
import MovieCast from "./MovieCast.vue";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
export default {
	name: "MovieDetails",
	components: {
		MovieCast,
	},
	data() {
		return {
			request: request,
		};
	},
	setup() {
		const route = useRoute();
		const { error, loading, movie, load } = getMovie(
			`movie/${route.params.id}?api_key=${request.apikey}&language=en-US`
		);

		onBeforeMount(async () => {
			await load();
			console.log(movie);
		});

		return { error, loading, movie };
	},
};
</script>

<style></style>
