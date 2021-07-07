<template>
	hello from test
	<div v-if="data.length">
		<div v-for="item in data" :key="item.id">
			{{ item.imdb_id }} - {{ item.movie_id }}
		</div>
	</div>
</template>

<script>
import getData from "@/composables/getData";
export default {
	setup() {
		const { data, error, loading, fetch } = getData("watch_list");

		fetch();

		return { data };
	},
};
</script>

<style></style>
