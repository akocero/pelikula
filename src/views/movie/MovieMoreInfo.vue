<template>
	<ul class="movie-details__additional-details">
		<li>
			<label>Status</label>
			<span>{{ movie.status }}</span>
		</li>
		<li>
			<label>Release Date</label>
			<span>{{ movie.release_date }}</span>
		</li>
		<li>
			<label>Original Language</label>
			<span>{{
				movie.original_language === "en"
					? "English"
					: movie.original_language
			}}</span>
		</li>
		<li>
			<label>Budget</label>
			<span>{{ movie.budget }}</span>
		</li>
		<li>
			<label>Revenue</label>
			<span>{{ movie.revenue }}</span>
		</li>
		<li>
			<label>Popularity</label>
			<span>{{ movie.popularity }}</span>
		</li>
		<li>
			<label>Vote Count</label>
			<span>{{ movie.vote_count }}</span>
		</li>
	</ul>
</template>

<script>
export default {
	name: "MovieMoreInfo",
	props: ["movie"],
};
</script>

<style></style>
