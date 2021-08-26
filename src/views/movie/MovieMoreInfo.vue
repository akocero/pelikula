<template>
	<ul class="more-info">
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
		<div class="more-info__links">
			<div v-if="movie.homepage">
				<a :href="movie.homepage"><i v-html="iHome"></i></a>
			</div>
			<div v-if="movie.external_ids.twitter_id">
				<a
					:href="
						'https://twitter.com/' + movie.external_ids.twitter_id
					"
					target="_blank"
					><i v-html="itwitter"></i
				></a>
			</div>
			<div v-if="movie.external_ids.instagram_id">
				<a
					:href="
						'https://www.instagram.com/' +
							movie.external_ids.instagram_id
					"
					target="_blank"
					><i v-html="iIG"></i
				></a>
			</div>
			<div v-if="movie.external_ids.facebook_id">
				<a
					:href="
						'https://www.facebook.com/' +
							movie.external_ids.facebook_id
					"
					target="_blank"
					><i v-html="iFb"></i
				></a>
			</div>
		</div>
	</ul>
</template>

<script>
import feather from "feather-icons";
export default {
	name: "MovieMoreInfo",
	props: ["movie"],
	computed: {
		iFb: function() {
			return feather.icons["facebook"].toSvg({
				width: 42,
			});
		},
		iIG: function() {
			return feather.icons["instagram"].toSvg({
				width: 42,
			});
		},
		iLinkedin: function() {
			return feather.icons["linkedin"].toSvg({
				width: 42,
			});
		},
		itwitter: function() {
			return feather.icons["twitter"].toSvg({
				width: 42,
			});
		},
		iHome: function() {
			return feather.icons["home"].toSvg({
				width: 42,
			});
		},
	},
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
