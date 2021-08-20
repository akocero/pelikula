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
	<div class="genre-page">
		<div class="genre-page__heading container" v-if="!loading">
			<h3 class="h3" v-if="getActiveGenre">
				Popular {{ getActiveGenre.name }} Movies
			</h3>
			<div class="genre-page__actions" v-if="genres">
				<span class="mr-1">Choose Genre:</span>
				<select
					name=""
					id=""
					v-model="genreValue"
					@change="handleChangeActiveGenre"
				>
					<option
						:value="genre.id"
						v-for="genre in genres"
						:key="genre.id"
						>{{ genre.name }}</option
					>
				</select>
				<span class="mr-1 ml-4">Sorted By:</span>
				<select @change="handleChangeSortedBy">
					<option
						v-for="sort in sortedByArray"
						:value="sort.value"
						:key="sort.value"
						class=""
						:selected="sort.active"
						>{{ sort.name }}</option
					>
				</select>
				<button class="btn btn-sm ml-1" @click="asc = !asc" v-if="!asc">
					Ascending
				</button>
				<button class="btn btn-sm ml-1" @click="asc = !asc" v-if="asc">
					Descending
				</button>
				<!-- <button class="btn btn-sm mr-1" @click="asc = !asc">
					Newest
				</button>
				<button class="btn btn-sm mr-1">Votes</button> -->
			</div>
		</div>
		<div class="container pt-1 pb-5">
			<p class="p note">
				Note: That this data is base of the popularity of the movies
			</p>
		</div>

		<div class="movies">
			<ul class="movies__list grid grid--6 grid__gap--3" v-if="movies">
				<li
					class="movies__item"
					v-for="(movie, index) in sortedMovies"
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
				<!-- <li class="movies__item">
					<div class="movies__item-poster" @click="handleLoadMore">
						<img
							:src="
								'https://via.placeholder.com/150x225/3F3F3F/FFFFFF/?text=Load More'
							"
							alt=""
						/>
					</div>
				</li> -->
			</ul>
			<div class="movies__loadmore pt-4">
				<button class="btn" @click="handleLoadMore">Load More</button>
			</div>
		</div>
	</div>
</template>

<script>
import request, { image_path } from "@/axios/request";
import getMovies from "@/composables/getMovies";
import getGenres from "@/composables/getGenres";
import { computed, onBeforeMount, ref } from "@vue/runtime-core";
import feather from "feather-icons";
import { useRoute, useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
	name: "GenrePage",
	components: {
		Loading,
	},
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
		const router = useRouter();
		const { movies, error, load: fetchMovies } = getMovies();
		const asc = ref(true);

		const { genres, fetchGenres } = getGenres();
		const loading = ref(false);
		const genreValue = ref(route.params.id);
		const currentPage = ref(1);
		const sortedByArray = ref([
			{ name: "Popularity", value: "popularity", active: true },
			{ name: "Released Date", value: "released_date", active: false },
			{ name: "Rating", value: "rating", active: false },
		]);
		const sortedBy = ref("popularity");

		onBeforeMount(async () => {
			loading.value = true;
			currentPage.value = 1;
			await loadMovies(route.params.id);
			await fetchGenres("/genre/movie/list?api_key=" + request.apikey);
			loading.value = false;
			console.log(movies.value);
		});

		const getActiveGenre = computed(() => {
			if (genres.value) {
				return genres.value.find(
					(genre) => genre.id == route.params.id
				);
			}
		});
		const sortedByReleasedDate = (a, b) => {
			return asc.value
				? new Date(b.release_date) - new Date(a.release_date)
				: new Date(a.release_date) - new Date(b.release_date);
		};

		const loadMovies = async (genreID) => {
			await fetchMovies(
				`/discover/movie?api_key=${request.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage.value}&with_genres=${genreID}`
			);
		};

		const sortedByPopularity = (a, b) => {
			return asc.value
				? b.popularity - a.popularity
				: a.popularity - b.popularity;
		};

		const sortedByRating = (a, b) => {
			return asc.value
				? b.vote_average - a.vote_average
				: a.vote_average - b.vote_average;
		};
		const sortedMovies = computed(() => {
			console.log(sortedBy.value);
			if (movies.value) {
				if (sortedBy.value === "released_date") {
					return movies.value.results.sort(sortedByReleasedDate);
				}

				if (sortedBy.value === "popularity") {
					return movies.value.results.sort(sortedByPopularity);
				}

				if (sortedBy.value === "rating") {
					return movies.value.results.sort(sortedByRating);
				}
			}
		});

		const handleChangeSortedBy = (e) => {
			sortedBy.value = e.target.value;
		};

		const handleChangeActiveGenre = async (e) => {
			loading.value = true;
			currentPage.value = 1;
			router.push({ name: "genre", params: { id: e.target.value } });
			await loadMovies(e.target.value);
			loading.value = false;
		};

		const handleLoadMore = async () => {
			// loading.value = true;
			currentPage.value += 1;
			console.log(currentPage.value);
			let currentMoviesResult = movies.value.results;
			await loadMovies(route.params.id);
			movies.value.results = [
				...currentMoviesResult,
				...movies.value.results,
			];
			// loading.value = false;
			// window.scrollTo(0, document.body.scrollHeight - 400);
			// setTimeout(() => {
			// 	window.scrollTo(0, document.body.scrollHeight - 1900);
			// 	// console.log(
			// 	// 	document.body.scrollHeight,
			// 	// 	document.body.scrollHeight - 1314
			// 	// );
			// }, 1000);
		};

		return {
			movies,
			image_path,
			getActiveGenre,
			genres,
			loading,
			genreValue,
			sortedMovies,
			asc,
			sortedByArray,
			sortedBy,
			handleChangeSortedBy,
			handleChangeActiveGenre,
			handleLoadMore,
		};
	},
};
</script>

<style></style>
