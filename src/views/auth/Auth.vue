<template>
	<div class="auth">
		<!-- <Signin /> -->
		<Signup />
		<div
			:style="{
				backgroundSize: 'cover',
				backgroundImage: `linear-gradient(
            to right, 
            rgba(1, 1, 1, 0.85),
            transparent), 
            url(${request.imagePathOrig}/${bg}.jpg)`,
				backgroundPosition: 'right center',
			}"
		></div>
	</div>
	<!-- <div className="fade-effect"></div> -->
</template>

<script>
import request from "@/axios/request";
import { ref } from "vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
export default {
	name: "Auth",
	components: {
		Signin,
		Signup,
	},
	data() {
		return {
			request: request,
		};
	},
	setup() {
		const imageArray = ref([
			"ii8QGacT3MXESqBckQlyrATY0lT",
			"6zbKgwgaaCyyBXE4Sun4oWQfQmi",
			"auZIuHEUec5tBTns3tCRXfayxZq",
			"6x00zPSgxcndnNvaFHdMtMT5Ytg",
		]);

		const bg =
			imageArray.value[
				Math.floor(Math.random() * imageArray.value.length)
			];

		return { bg };
	},
};
</script>

<style></style>
