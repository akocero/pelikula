<template>
	<form @submit.prevent="handleSubmit">
		<h5>Sign Up</h5>
		<div class="error mb-2" v-if="error">{{ error }}</div>
		<div>
			<!-- <label for="">Name</label> -->
			<input
				type="text"
				placeholder="Display Name"
				v-model="displayName"
				required
			/>
		</div>
		<div>
			<!-- <label for="">Email</label> -->
			<input type="email" placeholder="Email" v-model="email" required />
		</div>
		<div>
			<!-- <label for="">Password</label> -->
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
		<button type="submit" v-if="!loading">Sign Up</button>
		<button v-else disabled>Saving</button>
	</form>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
export default {
	name: "Signup",
	setup(props, { emit }) {
		const { error, loading, signup } = useSignup();
		const email = ref("");
		const password = ref("");
		const displayName = ref("");

		const handleSubmit = async () => {
			const data = {
				email: email.value,
				password: password.value,
				displayName: displayName.value,
			};

			await signup(data);

			if (!error.value) {
				emit("signup");
			}

			// console.log(data);
		};

		return { displayName, loading, error, password, email, handleSubmit };
	},
};
</script>

<style></style>
