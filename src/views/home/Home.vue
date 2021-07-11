<template>
	<div class="home">
		<!-- <Heading :movie="movie" /> -->
		<div
			class="search"
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right,  
            rgba(1, 1, 1, 0.95),
            transparent), 
            url(${request.imagePathOrig}/tM894AtE7UQTJEoQG6qF6mdfSUT.jpg)`,
				backgroundPosition: 'top center',
			}"
		>
			<form @submit.prevent="handleSearch">
				<div class="search__form-group">
					<input
						type="text"
						v-model="search"
						placeholder="Search ..."
					/>
					<button type="submit" class="search__button">
						<i v-html="iSearch"></i>
					</button>
				</div>
			</form>
		</div>
		<div className="fade-effect"></div>
		<Discover :url="request.trending" title="What's Trending?" />
		<Discover :url="request.topRated" title="Top Rated" />
	</div>
</template>

<script>
import request from "@/axios/request";
import Discover from "@/views/home/Discover";
import Heading from "@/views/home/Heading";
import Spinner from "@/components/Spinner";
import { ref } from "vue";
import feather from "feather-icons";
import { useRouter } from "vue-router";

export default {
	name: "Home",
	components: {
		Discover,
		Heading,
		Spinner,
	},
	computed: {
		iSearch: function() {
			return feather.icons["search"].toSvg({
				width: 42,
			});
		},
	},
	data() {
		return {
			request: request,
		};
	},
	setup() {
		const router = useRouter();
		const search = ref("");

		const handleSearch = () => {
			router.push({ name: "Browse Movies", query: { q: search.value } });
		};
		return { handleSearch, search };
	},
};
</script>
