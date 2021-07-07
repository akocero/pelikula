<template>
	<div
		class="movie-details"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
            to right, 
            rgba(0, 0, 0, 0.96),
            transparent), 
            url(${request.imagePathMd}${movie.backdrop_path})`,
			backgroundPosition: 'right center',
		}"
		v-if="movie"
	>
		<div class="movie-details__poster">
			<img :src="request.imagePathSm + movie.poster_path" alt="" />
		</div>
		<div class="movie-details__content">
			<div class="row">
				<h3 class="movie-details__title">{{ movie.title }}</h3>
				<p class="movie-details__info">R | 2021-06-17 | 95 mins</p>
				<ul class="movie-details__genre">
					<li>Action</li>
					<li>Comedy</li>
					<li>Horror</li>
				</ul>
				<div class="movie-details__imdb-rating">
					4.0
				</div>
			</div>
			<div class="row">
				<div class="movie-details__actions">
					<button class="btn-float">►</button>
					<button class="btn-float">❤</button>
					<button class="btn-float">⚑</button>
				</div>
			</div>
			<div class="row">
				<div class="movie-details__overview">
					<h4>Sypnosis</h4>
					<p>
						Luca and his best friend Alberto experience an
						unforgettable summer on the Italian Riviera. But all the
						fun is threatened by a deeply-held secret: they are sea
						monsters from another world just below the water’s
						surface.
					</p>
				</div>
			</div>
			<div class="row movie-details__other-info">
				<div>
					<h4>Francis Cuevas</h4>
					<label for="">Director</label>
				</div>
				<div>
					<h4>Francis Cuevas</h4>
					<label for="">Status</label>
				</div>

				<div>
					<h4>Francis Cuevas</h4>
					<label for="">Status</label>
				</div>
			</div>
		</div>
	</div>
	<div class="fade-effect"></div>
</template>

<script>
import request from "@/axios/request";
import getMovie from "@/composables/getMovie";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
export default {
	name: "MovieDetails",
	components: {},
	data() {
		return {
			request: request,
		};
	},
	setup(props) {
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
