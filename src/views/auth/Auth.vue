<template>
	<div
		class="auth"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
            to right, 
            rgba(1, 1, 1, 0.85),
            transparent), 
            url(${request.image_path.backdrop.w1280}${randomBG})`,
			backgroundPosition: 'center center',
		}"
	>
		<div class="auth__log-in container" v-if="!showSignup">
			<Signin @login="enterForum" />
			<p class="mt-3">
				No account yet?
				<span @click="showSignup = true">Sign up</span> instead
			</p>
		</div>

		<div class="auth__log-in container" v-else>
			<Signup @signup="enterForum" />
			<p class="mt-3">
				Already registered?
				<span @click="showSignup = false">Sign in</span> instead
			</p>
		</div>
	</div>
	<div className="fade-effect"></div>
</template>

<script>
import request from "@/axios/request";
import { computed, ref } from "vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
import { useRouter } from "vue-router";
import getBG from "@/composables/getBG";
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
		const router = useRouter();
		const { randomBG } = getBG();

		const enterForum = () => {
			console.log("Entered Forum");
			router.push({ name: "forum" });
		};

		return { randomBG, showSignup, enterForum };
	},
};
</script>

<style></style>
