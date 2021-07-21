<template>
	<transition name="fade" appear>
		<div class="modal__backdrop" v-if="showModal"></div>
	</transition>
	<transition name="pop" appear>
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
import getBG from "@/composables/getBG";
import { ref } from "vue";
import feather from "feather-icons";
import { useRouter } from "vue-router";
import useModal from "@/composables/useModal";

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
		const { randomBG } = getBG();
		const {
			modalContent,
			showModal,
			handleShowModal,
			handleCloseModal,
		} = useModal();

		const handleSearch = () => {
			router.push({ name: "browse_movies", query: { q: search.value } });
		};

		return {
			handleSearch,
			search,
			showModal,
			handleCloseModal,
			handleShowModal,
			modalContent,
			randomBG,
		};
	},
};
</script>
