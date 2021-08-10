<template>
	<div class="movie-details__more-info">
		<ul>
			<li>
				<h5>Status</h5>
				<span>{{ movie.status }}</span>
			</li>
			<li>
				<h5>Release Date</h5>
				<span>{{ movie.release_date }}</span>
			</li>
			<li>
				<h5>Original Language</h5>
				<span>{{
					movie.original_language === "en"
						? "English"
						: movie.original_language
				}}</span>
			</li>
			<li>
				<h5>Budget</h5>
				<span>{{ movie.budget }}</span>
			</li>
			<li>
				<h5>Revenue</h5>
				<span>{{ movie.revenue }}</span>
			</li>
			<li>
				<h5>Popularity</h5>
				<span>{{ movie.popularity }}</span>
			</li>
			<li>
				<h5>Vote Count</h5>
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
