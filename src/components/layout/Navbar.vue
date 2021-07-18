<template>
	<div class="navbar">
		<div class="navbar__brand">
			<router-link :to="{ name: 'home' }" class="">PELIKULA</router-link>
		</div>

		<transition name="nav">
			<nav class="navbar__nav" v-if="showNav">
				<ul class="navbar__list">
					<li class="navbar__item">
						<router-link
							:to="{
								name: 'browse_movies',
							}"
							class="navbar__link"
							@click="showNav = false"
							>Browse Movies</router-link
						>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">My Watchlist</a>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">
							<router-link
								:to="{
									name: 'auth',
								}"
								@click="showNav = false"
								class="navbar__link"
								>Sign In / Register</router-link
							>
						</a>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">FORUM</a>
					</li>
				</ul>
			</nav>
		</transition>
		<form
			@submit.prevent="handleSearch"
			action=""
			class="navbar__search"
			v-if="showNavSearch"
		>
			<input
				type="text"
				placeholder="Search ..."
				v-model="search"
				required
			/>
			<button><i v-html="iSearch"></i></button>
		</form>
		<div class="user" :class="!showNavSearch && 'ml-auto'">E</div>
		<div class="navbar__burger" @click="showNav = !showNav">
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
import { computed, ref } from "vue";
import feather from "feather-icons";
import { useRoute, useRouter } from "vue-router";

export default {
	name: "Navbar",
	computed: {
		iSearch: function() {
			return feather.icons["search"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const search = ref("");

		const handleSearch = () => {
			router.push({ name: "browse_movies", query: { q: search.value } });
			search.value = "";
		};
		const showNavSearch = computed(() => {
			const routesNotToShowSearch = ["browse_movies", "home", "auth"];
			return routesNotToShowSearch.includes(route.name) ? false : true;
		});

		const showNav = ref(false);

		return { showNav, showNavSearch, handleSearch, search };
	},
};
</script>

<style></style>
