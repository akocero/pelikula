<template>
	<Loading
		v-model:active="loading"
		:is-full-page="true"
		color="#ededed"
		loader="bars"
		:width="200"
		:height="150"
		background-color="#000"
		:opacity="0.95"
		:lock-scroll="true"
	/>
	<div class="person-details" v-if="domLoaded">
		<div class="heading">
			<div class="heading__wrapper">
				<div class="flex-row container">
					<div class="col-2">
						<div class="heading__poster">
							<img
								:src="
									request.image_path.poster.w220 +
										data.profile_path
								"
								alt=""
							/>
						</div>
						<div class="person-details__more-info">
							<ul>
								<li>
									<h5>Known For</h5>
									<span>{{ data.known_for_department }}</span>
								</li>
								<li>
									<h5>Known Credits</h5>
									<span>{{
										data.combined_credits.cast.length +
											data.combined_credits.crew.length
									}}</span>
								</li>
								<li>
									<h5>Birthday</h5>
									<span
										>{{ data.birthday }} ({{
											getComputedAge(data.birthday)
										}}
										years old)</span
									>
								</li>
								<li>
									<h5>Place of Birth</h5>
									<span>{{ data.place_of_birth }}</span>
								</li>
								<li>
									<h5>Also Known As</h5>

									<span
										v-for="name in data.also_known_as"
										:key="name"
									>
										{{ name }}
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-10 heading__content">
						<h4 class="heading__title">{{ data.name }}</h4>
						<div style="display: flex;">
							<p
								style="white-space: pre-wrap;"
								class="heading__biography"
							>
								{{ data.biography }}
							</p>
							<i v-html="iArrowDown"></i>
						</div>

						<BaseScrollable
							title="Most Popular Movies"
							:data="sortedCreditsByVoteCount"
							type="movies"
							:limit="15"
						/>

						<div>
							<div class="mt-3">
								<h4>Movies</h4>
							</div>

							<ul class="actor-movies grid grid--9">
								<li
									class="actor-movies__item"
									v-for="credit in sortedCreditsByDateRelease"
									:key="credit.id"
								>
									<img
										v-if="!credit.poster_path"
										src="https://via.placeholder.com/150x225/3F3F3F/FFFFFF/?text=Poster N/A"
										alt=""
									/>
									<img
										v-else
										class=""
										:src="
											request.image_path.poster.w92 +
												credit.poster_path
										"
										alt=""
									/>

									<div class="actor-movies__content">
										<h4 class="actor-movies__title">
											{{ credit.original_title }}
											<!-- <span
												class="actor-movies__release_date"
												>({{
													credit.release_date
												}})</span
											> -->
										</h4>

										<!-- <span class="actor-movies__character">{{
											credit.character
										}}</span> -->
									</div>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import feather from "feather-icons";
export default {
	name: "PersonDetails",
	components: {
		BaseScrollable,
		Loading,
	},
	computed: {
		iArrowDown: function() {
			return feather.icons["chevron-down"].toSvg({
				width: 28,
			});
		},
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

		const getComputedAge = (birthday) => {
			const today = new Date();
			const birthDate = new Date(birthday);
			let age = today.getFullYear() - birthDate.getFullYear();
			const m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		};

		const sortedCreditsByVoteCount = computed(() => {
			if (domLoaded.value) {
				return data.value?.combined_credits.cast.sort(
					(a, b) => b.vote_count - a.vote_count
				);
			}
		});

		const sortedCreditsByDateRelease = computed(() => {
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
			sortedCreditsByVoteCount,
			request,
			data,
			domLoaded,
			getComputedAge,
			sortedCreditsByDateRelease,
			loading,
		};
	},
};
</script>

<style></style>
