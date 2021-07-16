<template>
	<transition name="fade" appear>
		<div class="modal__backdrop" v-if="showModal"></div>
	</transition>
	<transition name="pop" appear>
		<Modal :movie="movie" v-if="showModal" @closeModal="handleCloseModal" />
	</transition>
	<div class="home">
		<!-- <Heading :movie="movie" /> -->
		<div
			class="search"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right,  
            rgba(1, 1, 1, 0.95),
            transparent), 
            url(${request.imagePathOrig}/tM894AtE7UQTJEoQG6qF6mdfSUT.jpg)`,
				backgroundPosition: 'top center',
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
		</div>
		<div className="fade-effect"></div>
		<Discover
			:url="request.topPopular"
			title="What's Popular?"
			@showModal="handleShowModal($event)"
		/>
		<Discover
			:url="request.trending"
			title="What's Trending?"
			@showModal="handleShowModal($event)"
		/>
		<Discover
			:url="request.topRated"
			title="Top Rated"
			@showModal="handleShowModal($event)"
		/>
		<Discover
			:url="request.topAction"
			title="Top Action"
			@showModal="handleShowModal($event)"
		/>
	</div>
</template>

<script>
import request from "@/axios/request";
import Discover from "@/views/home/Discover";
import Modal from "@/components/Modal";
import Heading from "@/views/home/Heading";
import Spinner from "@/components/Spinner";
import { ref } from "vue";
import feather from "feather-icons";
import { useRouter } from "vue-router";

export default {
	name: "Home",
	components: {
		Discover,
		Heading,
		Spinner,
		Modal,
	},
	computed: {
		iSearch: function() {
			return feather.icons["search"].toSvg({
				width: 42,
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
		const showModal = ref(false);
		const movie = ref(null);

		const handleShowModal = (movieEvent) => {
			movie.value = movieEvent;
			console.log("show modal", movieEvent);
			showModal.value = true;
		};

		const handleCloseModal = () => {
			movie.value = null;
			showModal.value = false;
		};

		const handleSearch = () => {
			router.push({ name: "browse_movies", query: { q: search.value } });
		};
		return {
			handleSearch,
			search,
			showModal,
			handleCloseModal,
			handleShowModal,
			movie,
		};
	},
};
</script>
