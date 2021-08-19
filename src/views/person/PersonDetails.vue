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
				<div class="container">
					<div class="flex-row">
						<div class="col-2 heading__poster">
							<img
								:src="
									request.image_path.poster.w220 +
										data.profile_path
								"
								alt=""
							/>
						</div>
						<div class="col-10 pl-2">
							<h1 class="h1 mb-1">{{ data.name }}</h1>
							<div class="mb-2 heading__biography">
								<p
									class="p mb-1"
									:class="[showBiography && 'show']"
								>
									{{ data.biography }}
								</p>
								<button
									class="btn btn__sm"
									@click="showBiography = !showBiography"
									v-if="!showBiography"
								>
									Read more ...
								</button>
								<button
									class="btn btn__sm"
									@click="showBiography = !showBiography"
									v-if="showBiography"
								>
									Read less
								</button>
							</div>
							<ul class="person-details__more-info">
								<li>
									<label>Popularity</label>
									<span class="icon"
										><i v-html="iActivity"></i
										>{{ data.popularity.toFixed(1) }}%</span
									>
								</li>
								<li>
									<label>Known For</label>
									<span>{{ data.known_for_department }}</span>
								</li>
								<li>
									<label>Known Credits</label>
									<span>{{
										data.combined_credits.cast.length +
											data.combined_credits.crew.length
									}}</span>
								</li>
								<li>
									<label>Birthday</label>
									<span
										>{{ data.birthday }} ({{
											getComputedAge(data.birthday)
										}}
										years old)</span
									>
								</li>
								<li>
									<label>Place of Birth</label>
									<span>{{ data.place_of_birth }}</span>
								</li>

								<li class="ml-auto link" v-if="data.homepage">
									<a :href="data.homepage"
										><i v-html="iHome"></i
									></a>
								</li>
							</ul>
						</div>
					</div>
					<!-- <h5>Most Popular Movies</h5> -->
					<BaseScrollable
						:data="sortedCreditsByVoteCount"
						type="movies"
						title="Popular Movies"
						:limit="15"
					/>

					<div class="actor-movies">
						<div class="mt-3 actor-movies__heading">
							<h5 class="h5">{{ data.name }} Movies</h5>
							<button
								class="btn btn__sm"
								v-if="newest"
								@click="newest = !newest"
							>
								Newest
							</button>

							<button
								class="btn btn__sm"
								v-else
								@click="newest = !newest"
							>
								Oldest
							</button>
						</div>

						<ul class="actor-movies__list">
							<li
								class="actor-movies__item"
								v-for="credit in sortedCreditsByDateRelease"
								:key="credit.id"
							>
								<div class="actor-movies__content">
									<span class="actor-movies__year"
										>{{ credit?.release_date.substr(0, 4) }}
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
		iActivity: function() {
			return feather.icons["activity"].toSvg({
				width: 14,
				color: "gold",
			});
		},
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
				fill: "gold",
			});
		},
		iHome: function() {
			return feather.icons["globe"].toSvg({
				width: 26,
				height: 26,
			});
		},
	},
	setup() {
		const route = useRoute();

		const { data, error, loading, load } = getPerson();
		const domLoaded = ref(false);
		const newest = ref(true);
		const showBiography = ref(false);
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

				return filteredCredit.sort((a, b) =>
					newest.value
						? new Date(b.release_date) - new Date(a.release_date)
						: new Date(a.release_date) - new Date(b.release_date)
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
			newest,
			showBiography,
		};
	},
};
</script>

<style></style>
