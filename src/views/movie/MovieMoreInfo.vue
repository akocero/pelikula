<template>
	<div class="movie-details__more-info">
		<h4 class="mb-2">More Information</h4>
		<ul>
			<li>
				<h4>Status</h4>
				<span>{{ movie.status }}</span>
			</li>
			<li>
				<h4>Release Date</h4>
				<span>{{ movie.release_date }}</span>
			</li>
			<li>
				<h4>Original Language</h4>
				<span>{{
					movie.original_language === "en"
						? "English"
						: movie.original_language
				}}</span>
			</li>
			<li>
				<h4>Budget</h4>
				<span>{{ movie.budget }}</span>
			</li>
			<li>
				<h4>Revenue</h4>
				<span>{{ movie.revenue }}</span>
			</li>
			<li>
				<h4>Popularity</h4>
				<span>{{ movie.popularity }}</span>
			</li>
			<li>
				<h4>Vote Count</h4>
				<span>{{ movie.vote_count }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "MovieMoreInfo",
	props: ["movie"],
};
</script>

<style></style>
