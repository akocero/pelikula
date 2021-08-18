<template>
	<div class="scrollable" v-if="data">
		<h4 class="scrollable__heading">{{ title }}</h4>
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
				<div v-if="type == 'movies'">
					<img
						v-if="!item.poster_path"
						src="https://via.placeholder.com/150x225/3F3F3F/FFFFFF/?text=Poster N/A"
						alt=""
					/>
					<img
						v-if="item.poster_path"
						:src="
							request.image_path.poster.w150 + item?.poster_path
						"
						alt=""
					/>
					<div>
						<router-link
							:to="{
								name: 'movie',
								params: { id: item.id },
							}"
							class="scrollable__title scrollable__title--clickable"
						>
							{{ item.title }}
						</router-link>
						<h5 class="scrollable__more-info">
							<span>{{ item.release_date?.substr(0, 4) }}</span>
							<span class="scrollable__average"
								><i v-html="iStar" class="pr-1"></i
								>{{
									Math.round(item.vote_average * 100) / 100
								}}</span
							>
						</h5>
					</div>
				</div>
				<div v-else>
					<img
						v-if="!item.profile_path"
						src="https://via.placeholder.com/138x175/3F3F3F/FFFFFF/?text=Profile N/A"
						alt=""
					/>
					<img
						v-if="item.profile_path"
						:src="
							request.image_path.credits.w138 + item.profile_path
						"
						alt=""
					/>

					<div>
						<router-link
							:to="{
								name: 'person',
								params: { id: item.id },
							}"
							class="scrollable__title scrollable__title--clickable"
						>
							{{ item.name }}
						</router-link>
						<h5 class="scrollable__subtitle" v-if="item.character">
							{{ item.character }}
						</h5>
						<!-- <h5 class="scrollable__more-info">
							<span>{{
								item?.job || item.known_for_department
							}}</span>
							<span class="scrollable__average"
								><i v-html="iAward" class="pr-1"></i
								>{{
									Math.round(item.popularity * 100) / 100
								}}%</span
							>
						</h5> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
import { computed } from "@vue/runtime-core";
import feather from "feather-icons";
export default {
	name: "BaseScrollable",
	props: {
		data: Array,
		title: String,
		type: String,
		limit: Number,
	},
	computed: {
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
				fill: "#f1c40f",
			});
		},
		iAward: function() {
			return feather.icons["activity"].toSvg({
				width: 14,
			});
		},
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
