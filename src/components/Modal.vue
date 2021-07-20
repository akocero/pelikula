<template>
	<div
		class="modal"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
            to right, 
            rgba(10,10,10, 0.6),
            transparent), 
            url(${request.image_path.backdrop.w780}${movie.backdrop_path})`,
			backgroundPosition: 'center center',
		}"
	>
		<button class="modal__button-close" @click="handleCloseModal">
			<i v-html="iX"></i>
		</button>
		<router-link
			:to="{ name: 'movie', params: { id: movie.id } }"
			class="modal__button-view-more"
		>
			<i v-html="iArrowRight"></i>
		</router-link>
		<div class="modal__body" v-if="movie">
			<!-- <div class="modal__poster" v-if="movie.poster_path">
				<img :src="request.imagePathSm + movie.poster_path" alt="" />
			</div> -->

			<div class="modal__content">
				<h2 class="modal__content__title">
					{{ movie.title }}
				</h2>
				<p class="mb-2 modal__content__info">
					{{ movie.release_date?.substr(0, 4) || "N/A" }}
				</p>

				<p class="mb-2 modal__content__tagline">
					{{ movie.tag_line }}
				</p>
				<!-- <ul class="modal__content__genre mb-2">
					<li>Action</li>
					<li>Animation</li>
					<li>Adventure</li>
				</ul> -->
				<p class="modal__content__overview mb-3">
					{{ movie.overview.substr(0, 120) }} ...
				</p>
				<h5 class="mb-1 ">Votes</h5>
				<p class="mb-1 modal__content__info">
					Average {{ movie.vote_average }}% | Count
					{{ movie.vote_count }} | Popularity {{ movie.popularity }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import feather from "feather-icons";
export default {
	name: "Modal",
	props: {
		movie: Object,
	},
	data() {
		return {
			request: request,
		};
	},
	computed: {
		iX: function() {
			return feather.icons["minimize"].toSvg({
				width: 18,
			});
		},
		iArrowRight: function() {
			return feather.icons["external-link"].toSvg({
				width: 18,
			});
		},
	},

	emits: ["closeModal"],
	setup(props, { emit }) {
		const handleCloseModal = () => {
			// document.body.classList.remove("modal--open");
			// document.querySelector(".modal__backdrop").classList.remove("show");
			props.movie.value = null;

			emit("closeModal");
		};

		return { handleCloseModal };
	},
};
</script>

<style></style>
