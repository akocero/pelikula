<template>
	<div class="movie-cast" v-if="credits">
		<h4 class="movie-cast__title">{{ title }}</h4>
		<div class="movie-cast__list" v-if="credits">
			<div
				class="movie-cast__item"
				v-for="cast in limitCasts"
				:key="cast.cast_id"
			>
				<div class="card">
					<div class="card__img">
						<img
							:src="request.imagePaths.w138 + cast.profile_path"
							alt=""
						/>
					</div>

					<div class="card__body">
						<h4 class="card__sub-title">{{ cast.name }}</h4>
						<h4 class="card__title">
							{{ cast?.character || cast.job }}
						</h4>
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
	name: "MovieCredits",
	components: {},
	props: ["credits", "title"],
	setup(props) {
		const limitCasts = computed(() => {
			const limitToShow = 12;
			if (props.credits) {
				return props.credits.filter(
					(item, index) => index < limitToShow
				);
			}
		});

		return { request, limitCasts };
	},
};
</script>

<style></style>
