<template>
	<div class="navbar">
		<div class="navbar__brand">
			<router-link :to="{ name: 'home' }" class="">PELIKULA</router-link>
		</div>
		<transition
			@enter="navAnim"
			@before-enter="navInitState"
			@leave="navAnimOut"
		>
			<nav class="navbar__nav" v-if="showNav">
				<transition-group
					class="navbar__list"
					tag="ul"
					appear
					@before-enter="navListInitState"
					@enter="navListAnim"
				>
					<li
						class="navbar__item"
						v-for="(link, index) in navLinks"
						:key="link.link"
						:data-index="index"
					>
						<router-link
							:to="{ path: link.link }"
							class="navbar__link"
							:class="{ 'navbar__link--disabled': link.disabled }"
							@click="showNav = false"
							>{{ link.label }}</router-link
						>
					</li>
				</transition-group>
				<!-- <ul class="navbar__list">
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
						<a href="" class="navbar__link">Request Movie</a>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">Genres</a>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">Actors</a>
					</li>
					<li class="navbar__item">
						<router-link
							:to="{
								name: 'auth',
							}"
							@click="showNav = false"
							class="navbar__link"
							>Signin / Signup</router-link
						>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">Forum</a>
					</li>
				</ul> -->
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
		<router-link
			role="button"
			:to="{ name: 'auth' }"
			class="btn btn__primary mr-2"
			:class="!showNavSearch && 'ml-auto'"
		>
			Sign In
		</router-link>
		<!-- <div class="user" >E</div> -->
		<div
			class="navbar__burger"
			@click="showNav = !showNav"
			:class="{ 'navbar__burger--open': showNav }"
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</template>

<script>
import { computed, ref } from "vue";
import feather from "feather-icons";
import { useRoute, useRouter } from "vue-router";
import getBG from "@/composables/getBG";
import request from "@/axios/request";
import gsap from "gsap";

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
		const { randomBG } = getBG();
		const animDurations = ref({
			nav: 300,
		});
		const navLinks = ref([
			{ label: "Browse Movie", link: "/browse_movies", disabled: false },
			{ label: "My Watchlist", link: "/auth", disabled: true },
			{ label: "Request Movie", link: "/auth", disabled: true },
			{ label: "Sign In/ Sign Up", link: "/auth", disabled: false },
			{ label: "Forum", link: "/auth", disabled: true },
			{ label: "Movie Genres", link: "/genre/35", disabled: false },
		]);

		const handleSearch = () => {
			router.push({ name: "browse_movies", query: { q: search.value } });
			search.value = "";
		};
		const showNavSearch = computed(() => {
			const routesNotToShowSearch = ["browse_movies", "home", "auth"];
			return routesNotToShowSearch.includes(route.name) ? false : true;
		});

		const showNav = ref(false);

		const navListInitState = (el) => {
			el.style.opacity = 0;
			el.style.transform = "translateY(100px)";
			console.log("before navListAnim");
		};

		const navListAnim = (el, done) => {
			setTimeout(() => {
				gsap.to(el, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					onComplete: done,
					ease: "back",
					delay: el.dataset.index * 0.3,
				});
			}, animDurations.value.nav);

			console.log("navListAnim");
		};

		const navAnim = (el, done) => {
			gsap.to(el, {
				opacity: 1,
				y: 0,
				duration: 0.3,
				onComplete: done,
				ease: "expo",
			});

			console.log("navAnim");
		};

		const navAnimOut = (el, done) => {
			gsap.to(el, {
				y: "-100%",
				duration: 0.3,
				onComplete: done,
				ease: "expo",
			});

			console.log("navAnimOut");
		};
		const navInitState = (el) => {
			el.style.transform = "translateY(-100%)";
		};

		return {
			showNav,
			showNavSearch,
			handleSearch,
			search,
			request,
			randomBG,
			navLinks,
			navListInitState,
			navListAnim,
			navAnim,
			navInitState,
			navAnimOut,
		};
	},
};
</script>

<style></style>
