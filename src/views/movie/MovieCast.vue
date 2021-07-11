<template>
	<div class="movie-cast">
		<h4 class="movie-cast__title">Top Billed Cast</h4>
		<div class="movie-cast__list">
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
			<div class="movie-cast__item">
				<Card />
			</div>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import Card from "@/components/Card";
export default {
	name: "MovieCast",
	components: {
		Card,
	},
	setup() {
		return { request };
	},
};
</script>

<style></style>
