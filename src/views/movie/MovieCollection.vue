<template>
	<div
		v-if="movie.belongs_to_collection"
		class="collection"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
							to right, 
							rgba(0, 0, 0, 0.96),
							rgba(0, 0, 0, 0.65)), 
							url(${request.image_path.backdrop.w780}${movie.belongs_to_collection.backdrop_path})`,
			backgroundPosition: 'center center',
		}"
	>
		<div class="collection__content">
			<div class="collection__title">
				Part of the {{ movie.belongs_to_collection.name }}
			</div>
			<button class="btn btn-collection">
				View the Collection
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "MovieCollection",
	props: ["movie", "request"],
};
</script>

<style></style>
