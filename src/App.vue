<template>
	<Navbar />
	<router-view />
	<Footer v-if="showFooter" />
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
	name: "App",
	components: {
		Navbar,
		Footer,
	},
	setup() {
		const route = useRoute();

		const showFooter = computed(() => {
			const routesNotToShowFooter = ["auth"];
			return routesNotToShowFooter.includes(route.name) ? false : true;
		});

		return { showFooter };
	},
};
</script>

<style lang="scss"></style>
