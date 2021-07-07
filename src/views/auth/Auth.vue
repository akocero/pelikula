<template>
	<div class="auth">
		<div class="auth__log-in" v-if="!showSignup">
			<Signin />
			<p class="mt-3">
				No account yet?
				<span @click="showSignup = true">Sign up</span> instead
			</p>
		</div>

		<div class="auth__log-in" v-else>
			<Signup />
			<p class="mt-3">
				Already registered?
				<span @click="showSignup = false">Sign in</span> instead
			</p>
		</div>

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
		const showSignup = ref(false);

		const imageArray = ref([
			"ii8QGacT3MXESqBckQlyrATY0lT",
			"6zbKgwgaaCyyBXE4Sun4oWQfQmi",
			"auZIuHEUec5tBTns3tCRXfayxZq",
			"6x00zPSgxcndnNvaFHdMtMT5Ytg",
		]);

		const handleSubmit = () => {};

		const bg =
			imageArray.value[
				Math.floor(Math.random() * imageArray.value.length)
			];

		return { bg, showSignup };
	},
};
</script>

<style></style>
