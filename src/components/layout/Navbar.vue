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
							>Search</router-link
						>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">My Playlist</a>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">
							<router-link
								:to="{
									name: 'auth',
								}"
								@click="showNav = false"
								class="navbar__link"
								>Sign In / Sign Up</router-link
							>
						</a>
					</li>
				</ul>
			</nav>
		</transition>
		<form action="" class="navbar__search" v-if="showNavSearch">
			<input type="text" placeholder="Search ..." />
			<button><i v-html="iSearch"></i></button>
		</form>
		<div
			class="navbar__burger"
			:class="!showNavSearch && 'ml-auto'"
			@click="showNav = !showNav"
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
import { ref, watch } from "vue";
import feather from "feather-icons";
import { useRoute } from "vue-router";

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
		const showNavSearch = ref(true);
		watch(route, () => {
			const routesNotToShowSearch = ["browse_movies", "home"];

			if (routesNotToShowSearch.includes(route.name)) {
				showNavSearch.value = false;
			} else {
				showNavSearch.value = true;
			}

			console.log(route.name);
		});

		const showNav = ref(false);

		return { showNav, showNavSearch };
	},
};
</script>

<style></style>
