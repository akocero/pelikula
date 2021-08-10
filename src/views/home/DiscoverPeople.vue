<template>
	<div style="position: relative">
		<Loading
			v-model:active="isPending"
			color="#ededed"
			:width="100"
			:height="70"
			background-color="#000"
			:opacity="0"
			:is-full-page="false"
		/>
		<div class="discover" v-if="people && !isPending">
			<h4 class="discover__heading">{{ title }}</h4>
			<div class="discover__list" v-if="people">
				<div
					v-for="person in people.results"
					:key="person.id"
					class="discover__item"
				>
					<img
						:src="image_path.poster.w220 + person?.profile_path"
						alt=""
						@click="handleClick(person)"
					/>

					<div class="discover__content">
						<router-link
							:to="{
								name: 'person',
								params: { id: person.id },
							}"
							class="discover__title discover__title--clickable"
						>
							<!-- {{ person.title?.substr(0, 20) }}... -->
							{{
								person.name?.length >= 18
									? person.name?.substr(0, 18) + "..."
									: person.name
							}}
							<!-- <span>({{ person.release_date?.substr(0, 4) }})</span> -->
						</router-link>
						<h5 class="discover__more-info">
							<span>{{ person.known_for_department }}</span>
							<span class="discover__vote-average">
								<i v-html="iAward" class="pr-1"></i>
								{{ Math.round(person.popularity * 100) / 100 }}%
							</span>
						</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import getMovies from "@/composables/getMovies";
import { image_path } from "@/axios/request";
import { onBeforeMount, ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import feather from "feather-icons";
export default {
	name: "DiscoverMovies",
	components: {
		Loading,
	},
	computed: {
		iStar: function() {
			return feather.icons["star"].toSvg({
				width: 14,
			});
		},
		iAward: function() {
			return feather.icons["activity"].toSvg({
				width: 14,
			});
		},
	},
	props: {
		url: String,
		title: String,
		type: String,
	},
	emits: ["showModal"],
	setup(props, { emit }) {
		const url = ref(props.url);
		const { movies: people, error, load, isPending } = getMovies(url.value);
		onBeforeMount(async () => {
			await load();
			console.log(people.value);
			console.log(people);
		});

		const handleClick = (person) => {
			emit("showModal", person);
		};

		const fakeloader = ref(true);

		return {
			people,
			error,
			isPending,
			handleClick,
			fakeloader,
			image_path,
		};
	},
};
</script>

<style></style>
