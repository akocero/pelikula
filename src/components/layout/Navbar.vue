<template>
	<div class="navbar">
		<div class="navbar__brand">
			<router-link :to="{ name: 'Home' }" class="">PELIKULA</router-link>
		</div>

		<transition name="nav">
			<nav class="navbar__nav" v-if="showNav">
				<ul class="navbar__list">
					<li class="navbar__item">
						<router-link
							:to="{
								name: 'Browse Movies',
							}"
							class="navbar__link"
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
									name: 'Auth',
								}"
								class="navbar__link"
								>Sign In</router-link
							>
						</a>
					</li>
					<li class="navbar__item">
						<a href="" class="navbar__link">Sign Up</a>
					</li>
				</ul>
			</nav>
		</transition>

		<div class="navbar__burger" @click="showNav = !showNav">
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
	name: "Navbar",
	setup() {
		const showNav = ref(false);

		return { showNav };
	},
};
</script>

<style>
.nav-enter-active,
.nav-leave-active {
	transition: transform 0.5s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.5s linear;
}

.nav-enter-from,
.nav-leave-to {
	transform: translateY(-100%);
}
</style>
