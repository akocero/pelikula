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
	<div class="browse-movies">
		<div
			class="browse-movies__heading"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right, 
            rgba(1, 1, 1, 0.85),
            transparent), 
            url(${request.image_path.backdrop.w1920}${randomBG})`,
				backgroundPosition: 'center bottom 80%',
			}"
		>
			<form @submit.prevent="handleSearch" class="search container">
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
				<div class="search__results">
					<div class="search__result">
						<h4>Total Pages</h4>
						<p class="ml-2">{{ totalPages }} / {{ pageNumber }}</p>
					</div>
				</div>
			</form>
		</div>
		<div className="fade-effect"></div>
		<div class="movies offset-y-10">
			<transition-group
				class="grid grid--6 grid__xs--2 grid__sm--4 grid__md--4 grid__gap--3 container movies__list"
				tag="ul"
				appear
				@before-enter="beforeEnter"
				@enter="enter"
			>
				<li
					class="movies__item"
					v-for="(movie, index) in movies"
					:key="movie.id"
					:data-index="index"
				>
					<div
						class="movies__item-poster"
						@click="handleShowModal(movie)"
					>
						<img
							v-if="!movie.poster_path"
							src="https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=Poster N/A"
						/>
						<img
							v-if="movie.poster_path"
							:src="
								request.image_path.poster.w220 +
									movie.poster_path
							"
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
			</transition-group>
		</div>

		<Spinner v-if="loading" />
		<div class="search__load-more">
			<button class="btn" v-if="isLoadMore" @click="handleLoadMore">
				Load more
			</button>
		</div>
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
import useModal from "@/composables/useModal";
import getBG from "@/composables/getBG";
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
		const { randomBG } = getBG();
		const { data: movies, loading, error, fetch, totalPages } = useSearch();
		const pageNumber = ref(1);
		const search = ref(route.query.q);

		const animationCounter = ref(0);
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
			router.push({ name: "browse_movies", query: { q: search.value } });
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

			randomBG,

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
