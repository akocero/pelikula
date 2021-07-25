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
					</div>
					<div class="col-9">
						<h4 class="heading__title">Eugene badato</h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ea laudantium molestias unde facilis voluptas,
							fuga officia recusandae nobis ratione temporibus?
							Doloribus, nisi. Dignissimos distinctio illo itaque
							vitae iste, laboriosam odit eaque suscipit explicabo
							aliquid dolores dicta qui aliquam optio obcaecati
							porro cupiditate dolore voluptas, quae quaerat error
							minus officia. Facere neque iusto nihil voluptatum
							magnam. Ipsa repellat, ut hic doloremque
							voluptatibus veniam ad expedita consequuntur
							necessitatibus amet asperiores. Porro, ut amet
							incidunt voluptatibus adipisci similique reiciendis
							laboriosam eius iste, cumque ipsum eligendi
							quibusdam voluptate. Ipsam dignissimos veniam neque
							optio, accusamus error voluptas repellendus
							molestiae deleniti sit doloribus similique quam.
							Facilis!
						</p>
						<BaseScrollable
							title="Known For"
							:movies="limitedMovies"
						/>
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

		const limitedMovies = computed(() => {
			if (domLoaded.value) {
				data.value?.combined_credits.cast.sort(function(a, b) {
					return b.vote_count - a.vote_count;
				});

				return data.value.combined_credits.cast.splice(0, 8);
			}
		});

		setTimeout(() => {
			console.log(data.value.combined_credits.cast);
		}, 10000);

		return { limitedMovies, request, data, domLoaded };
	},
};
</script>

<style>
.person-details .heading {
	height: 100vh;
}

.person-details {
	padding-bottom: 26rem;
}
</style>
