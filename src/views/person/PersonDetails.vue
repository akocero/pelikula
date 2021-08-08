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
					<div class="col-2 person-details__left">
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
					<div class="col-10 pl-4 heading__content">
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
						<!-- <h5>Most Popular Movies</h5> -->
						<BaseScrollable
							:data="sortedCreditsByVoteCount"
							type="movies"
							:limit="15"
						/>

						<div class="actor-movies">
							<div class="mt-3 actor-movies__heading">
								<h4>{{ data.name }} Movies</h4>
								<button>Newest</button>
							</div>

							<ul class="actor-movies__list">
								<li
									class="actor-movies__item"
									v-for="credit in sortedCreditsByDateRelease"
									:key="credit.id"
								>
									<div class="actor-movies__content">
										<span class="actor-movies__year"
											>{{
												credit?.release_date.substr(
													0,
													4
												)
											}}
											|
										</span>

										<span class="actor-movies__title">{{
											credit.original_title
										}}</span>
										<span class="actor-movies__character">
											as {{ credit.character }}</span
										>
									</div>
									<div class="actor-movies__vote">
										<i v-html="iStar"></i>
										<span>{{ credit.vote_average }}</span>
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
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
				fill: "gold",
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
