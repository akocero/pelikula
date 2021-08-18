<template>
	<ul class="movie-details__additional-details">
		<li>
			<label>Status</label>
			<span>{{ movie.status }}</span>
		</li>
		<li>
			<label>Release Date</label>
			<span>{{ dateToString(movie.release_date) }}</span>
		</li>
		<li>
			<label>Language</label>
			<span>{{
				movie.original_language === "en"
					? "English"
					: movie.original_language
			}}</span>
		</li>
		<li>
			<label>Budget</label>
			<span>{{ formatToCurrency(movie.budget) }}</span>
		</li>
		<li>
			<label>Revenue</label>
			<span>{{ formatToCurrency(movie.revenue) }}</span>
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
	name: "MovieAdditionalDetails",
	props: ["movie"],
	setup(props) {
		const formatToCurrency = (amount) => {
			return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
		};

		const dateToString = (date) => {
			let dateInWords = new Date(date);
			return dateInWords.toDateString();
		};

		return { formatToCurrency, dateToString };
	},
};
</script>

<style></style>
