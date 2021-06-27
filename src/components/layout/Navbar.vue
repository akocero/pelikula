<template>
	<div class="navbar" :class="hasBg && 'navbar--has-bg'">
		<div class="navbar__brand">
			<router-link :to="{ name: 'Home' }" class="navbar__link"
				>PELIKULA</router-link
			>
		</div>

		<nav class="navbar__nav">
			<ul class="navbar__list">
				<li class="navbar__item">
					<router-link
						:to="{ name: 'Browse Movies' }"
						class="navbar__link"
						>Search</router-link
					>
				</li>
				<li class="navbar__item">
					<a href="" class="navbar__link">My Playlist</a>
				</li>
				<li class="navbar__item">
					<a href="" class="navbar__link">Sign In</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
	name: "Navbar",
	setup() {
		const hasBg = ref(false);

		watchEffect(() => {
			const sc = window.addEventListener("scroll", () => {
				if (window.scrollY > 100) {
					hasBg.value = true;
				} else hasBg.value = false;
			});
		});

		return { hasBg };
	},
};
</script>

<style></style>
