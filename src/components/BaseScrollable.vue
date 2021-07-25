<template>
	<div class="scrollable" v-if="data">
		<h4 class="scrollable__title">{{ title }}</h4>
		<div class="scrollable__list" v-if="data">
			<!-- <pre>{{ movies }}</pre> -->
			<div
				class="scrollable__item"
				:class="
					type == 'movies'
						? 'scrollable__item--related-movies'
						: 'scrollable__item--credits'
				"
				v-for="item in limitedData"
				:key="item.id"
			>
				<div class="card" v-if="type == 'movies'">
					<div class="card__img">
						<img
							v-if="!item.poster_path"
							src="https://via.placeholder.com/150x225/3F3F3F/FFFFFF/?text=Poster N/A"
							alt=""
						/>
						<img
							v-if="item.poster_path"
							:src="
								request.image_path.poster.w150 +
									item?.poster_path
							"
							alt=""
						/>
					</div>

					<div class="card__body">
						<router-link
							class="card__title card__title--clickable"
							:to="{ name: 'movie', params: { id: item.id } }"
						>
							{{ item.title }} ({{
								item.release_date?.substr(0, 4)
							}})
						</router-link>
					</div>
				</div>
				<div class="card" v-else>
					<div class="card__img">
						<img
							v-if="!item.profile_path"
							src="https://via.placeholder.com/138x175/3F3F3F/FFFFFF/?text=Profile N/A"
							alt=""
						/>
						<img
							v-if="item.profile_path"
							:src="
								request.image_path.credits.w138 +
									item.profile_path
							"
							alt=""
						/>
					</div>

					<div class="card__body">
						<h4 class="card__sub-title">
							{{ item?.character || item.job }}
						</h4>
						<router-link
							class="card__title card__title--clickable"
							:to="{ name: 'person', params: { id: item.id } }"
						>
							{{ item.name }}
						</router-link>
					</div>
				</div>
			</div>
			<!-- <div>View More</div> -->
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import { computed } from "@vue/runtime-core";
export default {
	name: "BaseScrollable",
	props: {
		data: Array,
		title: String,
		type: String,
		limit: Number,
	},
	setup(props) {
		const limitedData = computed(() => {
			return props.data.slice(0, props.limit);
		});
		return { request, limitedData };
	},
};
</script>

<style></style>
