<template>
	<div class="person-details" v-if="domLoaded">
		<div class="heading">
			<div class="heading__wrapper">
				<div class="flex-row container">
					<div class="col-3">
						<div class="heading__poster">
							<img
								:src="
									request.image_path.poster.w300 +
										data.profile_path
								"
								alt=""
							/>
						</div>
						<div class="movie-details__more-info">
							<h4 class="mb-2">Personal Info</h4>
							<ul>
								<li>
									<h4>Known For</h4>
									<span>{{ data.known_for_department }}</span>
								</li>
								<li>
									<h4>Known Credits</h4>
									<span>{{
										data.combined_credits.cast.length +
											data.combined_credits.crew.length
									}}</span>
								</li>
								<li>
									<h4>Birthday</h4>
									<span
										>{{ data.birthday }} ({{
											computeAge(data.birthday)
										}}
										years old)</span
									>
								</li>
								<li>
									<h4>Place of Birth</h4>
									<span>{{ data.place_of_birth }}</span>
								</li>
								<li>
									<h4>Also Known As</h4>
									<ul>
										<li
											v-for="name in data.also_known_as"
											:key="name"
										>
											<span>{{ name }}</span>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-9 heading__content">
						<h4 class="heading__title pb-2">{{ data.name }}</h4>
						<h5 class="heading__subtitle mb-1">Biography</h5>
						<p style="white-space: pre-wrap;">
							{{ data.biography }}
						</p>
						<BaseScrollable
							title="Known For"
							:data="sortedByVoteCount"
							type="movies"
							:limit="10"
						/>

						<div>
							<ul class="actor-movies grid grid--6">
								<li
									class="actor-movies__item flex-row"
									v-for="credit in sortedByDateRelease"
									:key="credit.id"
								>
									<img
										class="col-5"
										:src="
											request.image_path.poster.w92 +
												credit.poster_path
										"
										alt=""
									/>
									<!-- <div class="actor-movies__content col-7">
										<h4 class="actor-movies__title">
											{{ credit.original_title }}
											<span
												class="actor-movies__release_date"
												>({{
													credit.release_date
												}})</span
											>
										</h4>

										<span class="actor-movies__character">{{
											credit.character
										}}</span>
									</div> -->
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import getPerson from "@/composables/getPerson";
import request from "@/axios/request";
import { onBeforeMount, computed, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import BaseScrollable from "@/components/BaseScrollable";
export default {
	name: "PersonDetails",
	components: {
		BaseScrollable,
	},
	setup() {
		const route = useRoute();

		const { data, error, loading, load } = getPerson();
		const domLoaded = ref(false);

		onBeforeMount(async () => {
			await load(
				`person/${route.params.id}?api_key=${request.apikey}&language=en-US&append_to_response=combined_credits,known_for_department`
			);
			domLoaded.value = true;
			console.log(data.value);
		});

		const computeAge = (birthday) => {
			const today = new Date();
			const birthDate = new Date(birthday);
			let age = today.getFullYear() - birthDate.getFullYear();
			const m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		};

		const sortedByVoteCount = computed(() => {
			if (domLoaded.value) {
				return data.value?.combined_credits.cast.sort(
					(a, b) => b.vote_count - a.vote_count
				);
			}
		});

		const sortedByDateRelease = computed(() => {
			if (domLoaded.value) {
				const filteredCredit = data.value.combined_credits.cast.filter(
					(credit) => {
						if (
							credit.release_date &&
							credit.media_type === "movie"
						) {
							return credit.release_date;
						}
					}
				);

				return filteredCredit.sort(
					(a, b) =>
						new Date(b.release_date) - new Date(a.release_date)
				);
			}
		});

		return {
			sortedByVoteCount,
			request,
			data,
			domLoaded,
			computeAge,
			sortedByDateRelease,
		};
	},
};
</script>

<style></style>
