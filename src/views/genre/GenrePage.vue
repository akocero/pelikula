<template>
	<div class="genre-page">
		<div class="genre-page__heading container pb-3" v-if="!loading">
			<h3 class="h3" v-if="getActiveGenre">
				Top {{ getActiveGenre.name }} Movies
			</h3>
			<div class="genre-page__actions">
				<span class="mr-1">Sorted By:</span>
				<button class="btn btn-sm mr-1">Popular</button>
				<button class="btn btn-sm mr-1">Newest</button>
				<button class="btn btn-sm mr-1">Votes</button>
				<select name="" id="">
					<option
						value=""
						v-for="genre in genres.genres"
						:key="genre.id"
						>{{ genre.name }}</option
					>
				</select>
			</div>
		</div>
		<div class="movies">
			<ul class="movies__list grid grid--6 grid__gap--3" v-if="movies">
				<li
					class="movies__item"
					v-for="(movie, index) in movies.results"
					:key="movie.id"
				>
					<span class="movies__item-number">
						{{ index + 1 }}
					</span>
					<div class="movies__item-poster">
						<img
							:src="image_path.poster.w220 + movie.poster_path"
							alt=""
						/>
					</div>
					<router-link
						:to="{
							name: 'movie',
							params: { id: movie.id },
						}"
						class="movies__item-title"
					>
						{{ movie.title }}
					</router-link>
					<h5 class="movies__item-subtitle">
						<span>{{ movie.release_date?.substr(0, 4) }}</span>
						<span class="movies__item-vote-average"
							><i v-html="iStar"></i
							>{{ movie.vote_average }}</span
						>
						<span class="movies__item-vote-average"
							><i v-html="iHeart"></i
							>{{ movie.popularity.toFixed(1) }}%</span
						>
					</h5>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import request, { image_path } from "@/axios/request";
import getMovies from "@/composables/getMovies";
import getGenres from "@/composables/getMovie";
import { computed, onBeforeMount } from "@vue/runtime-core";
import feather from "feather-icons";
import { useRoute } from "vue-router";
export default {
	name: "GenrePage",
	computed: {
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
				fill: "gold",
				color: "gold",
			});
		},
		iHeart: function() {
			return feather.icons["heart"].toSvg({
				width: 14,
				fill: "orangered",
				color: "orangered",
			});
		},
	},
	setup() {
		const route = useRoute();
		const { movies, error, load, isPending: loading } = getMovies(
			`/discover/movie?api_key=${request.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${route.params.id}`
		);

		const { movie: genres, load: loadGenres } = getGenres();

		onBeforeMount(async () => {
			await load();
			await loadGenres("/genre/movie/list?api_key=" + request.apikey);
			console.log(genres.value);
		});

		const getActiveGenre = computed(() => {
			if (genres.value) {
				return genres.value.genres.find(
					(genre) => (genre.id = route.params.id)
				);
			}
		});
		return { movies, image_path, getActiveGenre, genres, loading };
	},
};
</script>

<style></style>
