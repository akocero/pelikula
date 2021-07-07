<template>
	<div v-if="user">
		hello from forum {{ user.email }} display name {{ user.displayName }}
		<button @click="handleClick">Logout</button>
	</div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
export default {
	name: "ForumHome",
	setup() {
		const { logout, error } = useLogout();
		const { user } = getUser();
		const handleClick = async () => {
			await logout();

			if (!error.value) {
				console.log("user logged out");
				window.location.reload();
			}
		};
		return { handleClick, user };
	},
};
</script>

<style scoped>
button {
	margin-top: 20rem;
}
</style>
