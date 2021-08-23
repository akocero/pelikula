<template>
	<ul class="movie-details__links">
		<li v-if="external_ids && external_ids.facebook_id">
			<a
				:href="'https://www.facebook.com/' + external_ids.facebook_id"
				target="_blank"
			>
				<i v-html="iFb"></i>
			</a>
		</li>
		<li v-if="external_ids && external_ids.instagram_id">
			<a
				:href="'https://www.instagram.com/' + external_ids.instagram_id"
				target="_blank"
			>
				<i v-html="iInstagram"></i>
			</a>
		</li>
		<!-- <li><i v-html="iLinkedin"></i></li> -->
		<li v-if="external_ids && external_ids.twitter_id">
			<a
				:href="'https://twitter.com/' + external_ids.twitter_id"
				target="_blank"
			>
				<i v-html="itwitter"></i>
			</a>
		</li>
		<li v-if="homepage">
			<a :href="homepage" target="_blank">
				<i v-html="iHome"></i>
			</a>
		</li>
	</ul>
</template>

<script>
import feather from "feather-icons";
export default {
	name: "MovieExternalID",
	props: ["homepage", "external_ids"],
	computed: {
		iFb: function() {
			return feather.icons["facebook"].toSvg({
				width: 42,
			});
		},
		iInstagram: function() {
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
};
</script>
