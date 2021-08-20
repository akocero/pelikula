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
		}"
	>
		<div class="flex-row container">
			<div class="col-3 collection__poster" v-if="collection.poster_path">
				<img
					:src="image_path.poster.w300 + collection.poster_path"
					alt=""
				/>
			</div>
			<div class="col-9">
				<h3 class="h3">{{ collection.name }}</h3>
				<p class="p ">{{ collection.overview }}</p>
				<BaseScrollable
					:data="collection.parts"
					type="movies"
					:limit="12"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import request, { image_path } from "@/axios/request";
import getCollection from "@/composables/getMovie";
import { onBeforeMount } from "@vue/runtime-core";
import BaseScrollable from "@/components/BaseScrollable";
export default {
	name: "MovieCollection",
	props: ["id"],
	components: {
		BaseScrollable,
	},
	setup(props) {
		const { movie: collection, error, load, loading } = getCollection();

		onBeforeMount(async () => {
			await load(`/collection/${props.id}?api_key=${request.apikey}`);
			console.log(collection.value);
		});
		return { collection, request, image_path };
	},
};
</script>

<style></style>
