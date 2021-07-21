<template>
	<div class="scrollable" v-if="credits">
		<h4 class="scrollable__title">{{ title }}</h4>
		<div class="scrollable__list" v-if="credits">
			<div
				class="scrollable__item scrollable__item--credits"
				v-for="cast in limitedCredits"
				:key="cast.cast_id"
			>
				<div class="card">
					<div class="card__img">
						<img
							:src="
								request.image_path.credits.w138 +
									cast.profile_path
							"
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
		const limitedCredits = computed(() => {
			const limitToShow = 12;
			if (props.credits) {
				return props.credits.filter(
					(item, index) => index < limitToShow
				);
			}
		});

		return { limitedCredits, request };
	},
};
</script>

<style></style>
