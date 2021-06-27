<template>
	<div class="browse-movies">
		<div class="search">
			<form @submit.prevent="handleSearch">
				<input type="text" v-model="search" />
				<button type="submit">Search</button>
			</form>
		</div>
		<div>{{ totolaPages }}</div>
		<div class="movie-list">
			<div class="card" v-for="movie in movies" :key="movie.id">
				<img
					:src="request.imagePath + movie.poster_path"
					class="card__image"
				/>
				<div class="card__content">
					<h3 class="card__title">{{ movie.title }}</h3>
				</div>
			</div>
		</div>
		<button v-if="showLoadmore" @click="loadMore">Load more</button>
		<div v-else>No more movies</div>
	</div>
</template>

<script>
import useFetch from "@/composables/useFetch";
import request from "@/axios/request";
import { ref } from "vue";
export default {
	name: "BrowseMovies",
	setup() {
		const { data, isPending, error, fetch } = useFetch();
		const pageNumber = ref(1);
		const search = ref("");
		const movies = ref([]);
		const totolaPages = ref(0);
		const showLoadmore = ref(true);

		// fetch(request.trending);

		const loadMore = async () => {
			if (pageNumber.value == totolaPages.value) {
				showLoadmore.value = false;
			} else {
				pageNumber.value += 1;
				console.log(pageNumber.value, totolaPages.value);

				await fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=7d7a6c7d574c704591e07f29b54b6b0b&query=${search.value}&page=${pageNumber.value}`
				);

				if (!error.value) {
					movies.value = [...movies.value, ...data.value.results];
					totolaPages.value = data.value.total_pages;
				}
			}
		};

		const handleSearch = async () => {
			pageNumber.value = 1;
			showLoadmore.value = true;
			totolaPages.value = 0;

			await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=7d7a6c7d574c704591e07f29b54b6b0b&query=${search.value}&page=${pageNumber.value}`
			);

			if (!error.value) {
				movies.value = data.value.results;
				totolaPages.value = data.value.total_pages;
			}
		};

		return {
			search,
			handleSearch,
			movies,
			isPending,
			error,
			request,
			loadMore,
			totolaPages,
			showLoadmore,
		};
	},
};
</script>

<style></style>
