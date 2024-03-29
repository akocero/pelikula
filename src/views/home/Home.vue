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

	<div class="home">
		<div
			class="home__heading "
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to bottom,  
            rgba(16, 16, 16, 0.40),
            rgba(16, 16, 16, 0.90)), 
            url(${request.image_path.backdrop.w1280}${randomBG})`,
				backgroundPosition: 'center center',
			}"
		>
			<div class="home__heading-content">
				<h1 class="home__heading-title">
					The Open Source
					<span class="home__heading-title--imdb">IMDB</span> &
					<span class="home__heading-title--mobi">
						Mobilarian Movie Section</span
					>
					Alternative
				</h1>
				<h4 class="h4 home__heading-subtitle">
					Discover thousands of TV shows and movies, Create a
					discussions of all the movies you love.
				</h4>
				<form @submit.prevent="handleSearch" class="search mt-3">
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
				<i v-html="iDown" class="home__heading-scroll-down"></i>
			</div>
		</div>
		<div className="fade-effect"></div>

		<DiscoverMovies
			:url="request.topPopular"
			title="What's Popular?"
			@showModal="handleShowModal($event)"
		/>

		<DiscoverPeople :url="request.topPeople" title="Top People" />

		<DiscoverMovies
			:url="request.trending"
			title="What's Trending?"
			@showModal="handleShowModal($event)"
		/>

		<DiscoverMovies
			:url="request.topRated"
			title="Top Rated"
			@showModal="handleShowModal($event)"
		/>

		<MovieCollection
			:id="790370"
			:request="request"
			@showModal="handleShowModal($event)"
		/>
		<DiscoverMovies
			:url="request.topAction"
			title="Top Action"
			@showModal="handleShowModal($event)"
		/>
	</div>
</template>

<script>
import request from "@/axios/request";
import DiscoverMovies from "./DiscoverMovies";
import DiscoverPeople from "./DiscoverPeople";
import Modal from "@/components/Modal";
import Heading from "@/views/home/Heading";
import Spinner from "@/components/Spinner";
import getBG from "@/composables/getBG";
import { ref } from "vue";
import feather from "feather-icons";
import { useRouter } from "vue-router";
import useModal from "@/composables/useModal";
import MovieCollection from "../movie/MovieCollection.vue";

export default {
	name: "Home",
	components: {
		DiscoverMovies,
		DiscoverPeople,
		Heading,
		Spinner,
		Modal,
		MovieCollection,
	},
	computed: {
		iSearch: function() {
			return feather.icons["search"].toSvg({
				width: 42,
			});
		},
		iDown: function() {
			return feather.icons["chevron-down"].toSvg({
				width: 32,
				height: 32,
			});
		},
	},
	data() {
		return {
			request: request,
		};
	},
	setup() {
		const router = useRouter();
		const search = ref("");
		const { randomBG } = getBG();
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

		const handleSearch = () => {
			router.push({ name: "browse_movies", query: { q: search.value } });
		};

		return {
			handleSearch,
			search,
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
