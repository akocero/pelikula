<template>
	<div class="movie-details__images scrollable-x">
		<div
			v-for="image in images"
			:key="image.id"
			class="movie-details__images-item"
		>
			<!-- https://i.ytimg.com/vi/tgbNymZ7vqY/hqdefault.jpg -->
			<img
				:src="image_path.poster.w150 + image.file_path"
				alt=""
				class="poster"
				v-if="type === 'poster'"
			/>
			<img
				class="backdrop"
				:src="image_path.backdrop.w300 + image.file_path"
				alt=""
				v-else
			/>
		</div>
	</div>
</template>

<script>
import { image_path } from "@/axios/request";
export default {
	name: "MovieImages",
	props: {
		images: {
			type: Object,
			required: true,
		},
		type: {
			type: String,
			default: "poster",
		},
	},
	data() {
		return {
			image_path: image_path,
		};
	},
};
</script>

<style></style>
