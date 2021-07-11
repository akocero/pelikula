<template>
	<div
		class="auth"
		:style="{
			backgroundSize: 'cover',
			backgroundImage: `linear-gradient(
            to right, 
            rgba(1, 1, 1, 0.85),
            transparent), 
            url(${request.imagePathOrig}${bg})`,
			backgroundPosition: 'right center',
		}"
	>
		<div class="auth__log-in" v-if="!showSignup">
			<Signin @login="enterForum" />
			<p class="mt-3">
				No account yet?
				<span @click="showSignup = true">Sign up</span> instead
			</p>
		</div>

		<div class="auth__log-in" v-else>
			<Signup @signup="enterForum" />
			<p class="mt-3">
				Already registered?
				<span @click="showSignup = false">Sign in</span> instead
			</p>
		</div>
	</div>
	<!-- <div className="fade-effect"></div> -->
</template>

<script>
import request from "@/axios/request";
import { ref } from "vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
import { useRouter } from "vue-router";
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
		// Backdrop Path
		const imageArray = ref([
			"/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg", // Thor
			"/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg", // John wick
			"/eNb0zhVdxdo9U0950s0LnrjndWR.jpg", // Apocalypto
			"/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg", // Parasite
			"/x09wMSCS5mepN8lVRhmatyowVUd.jpg", // 300
			"/pbrkL804c8yAv3zBZR4QPEafpAR.jpg", // interstellar
			"/194dso1hBwQEgIU3fgS7mXHtFAj.jpg", // city of god
			"/xnqust9Li4oxfhXD5kcPi3UC8i4.jpg", // Avengers: Age of Ultron
			"/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg",
		]);

		const enterForum = () => {
			console.log("Entered Forum");
			router.push({ name: "forum" });
		};

		const bg =
			imageArray.value[
				Math.floor(Math.random() * imageArray.value.length)
			];

		return { bg, showSignup, enterForum };
	},
};
</script>

<style></style>
