<template>
	<div class="modal">
		<button class="modal__button-close" @click="handleCloseModal">
			<i v-html="iX"></i>
		</button>
		<div
			class="modal__body"
			v-if="movie"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `
            url(${request.imagePathMd}${movie.backdrop_path})`,
				backgroundPosition: 'top center',
			}"
		>
			<div class="modal__poster" v-if="movie.poster_path">
				<img :src="request.imagePathSm + movie.poster_path" alt="" />
			</div>

			<div class="modal__content">
				<h2 class="modal__content__title">
					{{ movie.title }}
					({{ movie.release_date.substr(0, 4) }})
				</h2>
				<ul class="modal__content__genre mb-2">
					<li>Action</li>
					<li>Animation</li>
					<li>Adventure</li>
				</ul>
				<p class="modal__content__overview">
					<strong>Overview:</strong><br />
					{{ movie.overview }}
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
			return feather.icons["x"].toSvg({
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
