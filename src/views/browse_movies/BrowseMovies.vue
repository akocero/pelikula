<template>
	<div class="browse-movies">
		<div
			class="search"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right, 
            rgba(1, 1, 1, 0.85),
            transparent), 
            url(${request.imagePathOrig}/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg)`,
				backgroundPosition: 'center center',
			}"
		>
			<form @submit.prevent="handleSearch">
				<div class="search__form-group">
					<input type="text" v-model="search" />
					<button type="submit" class="search__button">Search</button>
				</div>
			</form>
			<div class="search__results">
				<div class="search__result">
					<h4>Total Pages</h4>
					<p class="ml-2">{{ totalPages }} / {{ pageNumber }}</p>
				</div>
			</div>
		</div>
		<div className="fade-effect"></div>

		<div class="movie-list">
			<div class="card" v-for="movie in movies" :key="movie.id">
				<img
					:src="request.imagePath + movie.poster_path"
					class="card__image"
				/>
				<!-- <div class="card__content">
					<h3 class="card__title">{{ movie.title }}</h3>
				</div> -->
			</div>
		</div>
		<Spinner v-if="isPending" />
		<div class="search__load-more">
			<button v-if="isLoadMore" @click="handleLoadMore">
				Load more
			</button>
		</div>

		<!-- <div v-else>No more movies</div> -->
	</div>
</template>

<script>
import useSearch from "@/composables/useSearch";
import request from "@/axios/request";
import Spinner from "@/components/Spinner";
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
export default {
	name: "BrowseMovies",
	components: {
		Spinner,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const { data: movies, loading, error, fetch, totalPages } = useSearch();
		const pageNumber = ref(1);
		const search = ref(route.query.q);

		onBeforeMount(async () => {
			if (route.query.q) {
				await fetch(route.query.q, 1);
			} else {
				movies.value = [];
				totalPages.value = 0;
			}
		});

		const handleSearch = async () => {
			pageNumber.value = 1;
			router.push({ name: "Browse Movies", query: { q: search.value } });
			await fetch(search.value, pageNumber.value);
		};

		const handleLoadMore = () => {
			if (pageNumber.value < totalPages.value) {
				pageNumber.value += 1;
				fetch(search.value, pageNumber.value);
				console.log(
					"page:" + pageNumber.value,
					"total:" + totalPages.value
				);
			} else {
				console.log(pageNumber.value);
			}
		};

		const isLoadMore = computed(
			() => totalPages.value > 1 && pageNumber.value < totalPages.value
		);

		return {
			search,
			handleSearch,
			movies,
			loading,
			error,
			request,
			handleLoadMore,
			isLoadMore,
			totalPages,
			pageNumber,
		};
	},
};
</script>

<style></style>
