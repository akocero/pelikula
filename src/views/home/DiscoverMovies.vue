<template>
	<div style="position: relative">
		<Loading
			v-model:active="isPending"
			color="#ededed"
			:width="100"
			:height="70"
			background-color="#000"
			:opacity="0"
			:is-full-page="false"
		/>
		<div class="discover" v-if="movies && !isPending">
			<h4 class="discover__heading">{{ title }}</h4>
			<div class="discover__list" v-if="movies">
				<div
					v-for="movie in movies.results"
					:key="movie.id"
					class="discover__item"
				>
					<img
						:src="
							request.image_path.poster.w220 + movie?.poster_path
						"
						alt=""
						@click="handleClick(movie)"
					/>

					<div class="discover__content">
						<router-link
							:to="{
								name: 'movie',
								params: { id: movie.id },
							}"
							class="discover__title discover__title--clickable"
						>
							<!-- {{ movie.title?.substr(0, 20) }}... -->
							<!-- {{
								movie.title?.length >= 18
									? movie.title?.substr(0, 18) + "..."
									: movie.title
							}} -->
							{{ movie.title }}
							<!-- <span>({{ movie.release_date?.substr(0, 4) }})</span> -->
						</router-link>
						<h5 class="discover__more-info">
							<span>{{ movie.release_date?.substr(0, 4) }}</span>
							<span class="discover__vote-average"
								><i v-html="iStar" class="pr-1"></i
								>{{ movie.vote_average }}</span
							>
						</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import getMovies from "@/composables/getMovies";
import request from "@/axios/request";
import { onBeforeMount, ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import feather from "feather-icons";
export default {
	name: "DiscoverMovies",
	components: {
		Loading,
	},
	computed: {
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
				fill: "#f1c40f",
			});
		},
	},
	props: {
		url: String,
		title: String,
		type: String,
	},
	emits: ["showModal"],
	setup(props, { emit }) {
		const url = ref(props.url);
		const { movies, error, load, isPending } = getMovies();
		onBeforeMount(async () => {
			await load(url.value);
		});

		const handleClick = (movie) => {
			emit("showModal", movie);
		};

		const fakeloader = ref(true);

		return { movies, error, isPending, handleClick, request, fakeloader };
	},
};
</script>

<style></style>
