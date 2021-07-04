<template>
	<transition name="fade" appear>
		<div class="modal__backdrop" v-if="movieDetails"></div>
	</transition>
	<transition name="pop" appear>
		<Modal
			:movie="movieDetails"
			v-if="movieDetails"
			@closeModal="handleCloseModal"
		/>
	</transition>
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
					<input
						type="text"
						v-model="search"
						placeholder="Search ..."
					/>
					<button type="submit" class="search__button">
						<i v-html="iSearch"></i>
					</button>
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

		<transition-group
			class="movie-list"
			tag="div"
			appear
			@before-enter="beforeEnter"
			@enter="enter"
		>
			<div
				class="card"
				v-for="(movie, index) in movies"
				:key="movie.id"
				:data-index="index"
				@click="showModal(movie)"
			>
				<img
					v-if="movie.poster_path"
					:src="request.imagePath + movie.poster_path"
					class="card__image"
				/>
				<div v-else class="card__no-image">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="60%"
						height="60%"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-image"
					>
						<rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="2"
							ry="2"
						></rect>
						<circle cx="8.5" cy="8.5" r="1.5"></circle>
						<polyline points="21 15 16 10 5 21"></polyline>
					</svg>
				</div>
			</div>
		</transition-group>

		<Spinner v-if="loading" />
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
import Modal from "@/components/Modal";
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import feather from "feather-icons";
import gsap from "gsap";
export default {
	name: "BrowseMovies",
	components: {
		Spinner,
		Modal,
	},
	computed: {
		iSearch: function() {
			return feather.icons["search"].toSvg({
				width: 42,
			});
		},
		iImage: function() {
			return feather.icons["image"].toSvg({
				width: 32,
				height: 32,
			});
		},
	},

	setup() {
		const route = useRoute();
		const router = useRouter();
		const { data: movies, loading, error, fetch, totalPages } = useSearch();
		const pageNumber = ref(1);
		const search = ref(route.query.q);
		const animationCounter = ref(0);
		const movieDetails = ref(null);

		onBeforeMount(async () => {
			if (route.query.q) {
				movies.value = [];
				await fetch(route.query.q, 1);
			} else {
				movies.value = [];
				totalPages.value = 0;
			}
			animationCounter.value = 0;
		});

		const handleSearch = async () => {
			pageNumber.value = 1;
			router.push({ name: "Browse Movies", query: { q: search.value } });
			await fetch(search.value, pageNumber.value);
			animationCounter.value = 0;
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
			animationCounter.value !== 0
				? (animationCounter.value *= 2)
				: (animationCounter.value = 2.85);
		};

		const isLoadMore = computed(
			() => totalPages.value > 1 && pageNumber.value < totalPages.value
		);

		const beforeEnter = (el) => {
			el.style.opacity = 0;
			el.style.transform = "translateY(100px)";
		};

		const enter = (el, done) => {
			gsap.to(el, {
				opacity: 1,
				y: 0,
				duration: 1,
				onComplete: done,
				ease: "back",
				delay: el.dataset.index * 0.15 - animationCounter.value,
			});

			console.log(el.dataset.index * 0.15, animationCounter.value);
		};

		const showModal = (movie) => {
			movieDetails.value = null;
			movieDetails.value = movie;
			// document.body.classList.add("modal--open");
			// document.querySelector(".modal__backdrop").classList.add("show");
			console.log("show modal");

			console.log(movieDetails.value);
		};

		const handleCloseModal = () => {
			movieDetails.value = null;
			console.log("close modal");
		};

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
			beforeEnter,
			enter,
			showModal,
			movieDetails,
			handleCloseModal,
		};
	},
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
	transition: transform 0.5s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.5s linear;
}

.pop-enter-from,
.pop-leave-to {
	opacity: 0;
	transform: scale(0.3);
}
</style>
