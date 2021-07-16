<template>
	<Navbar />
	<router-view />
	<Footer />
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default {
	name: "App",
	components: {
		Navbar,
		Footer,
	},
};
</script>

<style lang="scss"></style>
