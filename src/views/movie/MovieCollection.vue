<template>
	<div
		v-if="collection"
		class="collection"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
							to top, 
							rgba(7, 15, 21, 0.98),
							rgba(7, 15, 21, 0.85)), 
							url(${request.image_path.backdrop.w1280}${collection.backdrop_path})`,
			backgroundPosition: 'center bottom 80%',
			backgroundAttachment: 'fixed',
		}"
	>
		<div class="flex-row collection__wrapper">
			<div class="col-3 col-sm-12 collection__poster">
				<img
					v-if="collection.poster_path"
					:src="image_path.poster.w300 + collection.poster_path"
					alt=""
				/>
				<img
					v-else
					:src="
						image_path.poster.w300 + collection.parts[0].poster_path
					"
					alt=""
				/>
			</div>
			<div class="col-9 col-sm-12 collection__content">
				<h3 class="h3 collection__title">{{ collection.name }}</h3>
				<p class="p collection__overview mb-3">
					{{ collection.overview }}
				</p>
				<ul
					class="grid grid--6 grid__xs--2 grid__sm--4 grid__md--4 grid__gap--3 movies__list"
				>
					<li
						class="movies__item"
						v-for="(movie, index) in collection.parts"
						:key="movie.id"
						:data-index="index"
					>
						<div
							class="movies__item-poster"
							@click="handleClickPoster(movie)"
						>
							<img
								v-if="!movie.poster_path"
								src="https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=Poster N/A"
							/>
							<img
								v-if="movie.poster_path"
								:src="
									request.image_path.poster.w220 +
										movie.poster_path
								"
							/>
						</div>
						<router-link
							:to="{
								name: 'movie',
								params: { id: movie.id },
							}"
							class="movies__item-title"
						>
							{{ movie.title }}
						</router-link>
						<h5 class="movies__item-subtitle">
							<span>{{ movie.release_date?.substr(0, 4) }}</span>
							<span class="movies__item-vote-average"
								><i v-html="iStar"></i
								>{{ movie.vote_average }}</span
							>
						</h5>
					</li>
				</ul>
				<!-- <BaseScrollable
					:data="collection.parts"
					type="movies"
					:limit="12"
				/> -->
			</div>
		</div>
	</div>
</template>

<script>
import request, { image_path } from "@/axios/request";
import getCollection from "@/composables/getMovie";
import { onBeforeMount } from "@vue/runtime-core";
import BaseScrollable from "@/components/BaseScrollable";
import feather from "feather-icons";
export default {
	name: "MovieCollection",
	props: ["id"],
	computed: {
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
				fill: "gold",
				color: "gold",
			});
		},
		iHeart: function() {
			return feather.icons["heart"].toSvg({
				width: 14,
				fill: "orangered",
				color: "orangered",
			});
		},
	},
	components: {
		BaseScrollable,
	},
	emits: ["showModal"],
	setup(props, { emit }) {
		const { movie: collection, error, load, loading } = getCollection();

		onBeforeMount(async () => {
			await load(`/collection/${props.id}?api_key=${request.apikey}`);
			// console.log(collection.value);
		});

		const handleClickPoster = (movie) => {
			emit("showModal", movie);
		};

		return { collection, request, image_path, handleClickPoster };
	},
};
</script>

<style></style>
