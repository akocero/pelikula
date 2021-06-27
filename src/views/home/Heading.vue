<template>
	<div
		class="heading"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
            to right, 
            rgba(1, 1, 1, 0.80),
            transparent), 
            url(${imagePath}${movie.backdrop_path})`,
			backgroundPosition: 'center center',
		}"
	>
		<div class="heading__content">
			<div class="heading__title">
				{{ movie.title }}
			</div>
			<div class="heading__overview">
				{{ movie.overview }}
			</div>
		</div>
	</div>
	<div className="fade-effect"></div>
</template>

<script>
import request from "@/axios/request";
export default {
	name: "Heading",
	props: {
		movie: Object,
	},
	data() {
		return {
			imagePath: request.imagePath,
		};
	},
};
</script>

<style></style>
