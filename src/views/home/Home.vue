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
		<!-- <Heading :modalContent="modalContent" /> -->
		<div
			class="search"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right,  
            rgba(1, 1, 1, 0.99),
            transparent), 
            url(${request.image_path.backdrop.w1920}${randomBG})`,
				backgroundPosition: 'center bottom 80%',
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
		<DiscoverMovies
			:url="request.topPopular"
			title="What's Popular?"
			@showModal="handleShowModal($event)"
		/>

		<DiscoverPeople
			:url="request.topPeople"
			title="Top People"
			@showModal="handleShowModal($event)"
		/>

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

export default {
	name: "Home",
	components: {
		DiscoverMovies,
		DiscoverPeople,
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
