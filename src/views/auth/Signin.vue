<template>
	<form @submit.prevent="handleSubmit">
		<h5>Sign In</h5>
		<div class="error mb-2" v-if="error">{{ error }}</div>
		<div>
			<label for="">Email</label>
			<input type="email" placeholder="Email" v-model="email" required />
		</div>
		<div>
			<label for="">Password</label>
			<input
				type="password"
				placeholder="Password"
				v-model="password"
				required
			/>
		</div>
		<div class="mb-2">
			<a href="">Forgot Password?</a>
		</div>
		<button type="submit" v-if="!loading">Sign In</button>
		<button v-else disabled>Logging In...</button>
	</form>
</template>

<script>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
export default {
	name: "Signin",
	setup() {
		const { error, loading, login } = useLogin();
		const email = ref("");
		const password = ref("");

		const handleSubmit = async () => {
			const data = {
				email: email.value,
				password: password.value,
			};

			await login(data);

			if (!error.value) {
				console.log("user is logged in");
			}

			console.log(data);
		};

		return { loading, error, password, email, handleSubmit };
	},
};
</script>

<style></style>
