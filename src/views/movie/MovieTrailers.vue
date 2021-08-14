<template>
	<div class="movie-details__tailers">
		<div v-for="video in videos" :key="video.id">
			<!-- https://i.ytimg.com/vi/tgbNymZ7vqY/hqdefault.jpg -->
			<div
				class="video"
				:style="{
					background: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
				}"
			>
				<a role="button" @click="$emit('playTrailer', video)"
					><i v-html="iPlay"></i
				></a>
			</div>
		</div>
	</div>
</template>

<script>
import feather from "feather-icons";
export default {
	name: "MovieTrailers",
	props: ["videos"],
	emits: ["playTrailer"],
	computed: {
		iPlay: function() {
			return feather.icons["play"].toSvg({
				width: 22,
				height: 22,
				fill: "#fff",
				color: "#fff",
			});
		},
	},
	setup() {},
};
</script>

<style></style>
