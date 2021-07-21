<template>
	<div class="skeleton" :class="type"></div>
</template>

<script>
export default {
	name: "BaseSkeleton",
	props: ["type"],
};
</script>

<style lang="scss" scoped>
.skeleton {
	background-color: #ddd;
	margin: 10px 0;
	border-radius: 4px;

	&__text {
		width: 100%;
		height: 12px;
	}
	&__title {
		width: 50%;
		height: 20px;
		margin-bottom: 15px;
	}

	&__avatar {
		width: 50%;
		height: 20px;
		margin-bottom: 15px;
	}

	&__poster {
		width: 138px;
		height: 170px;
	}
}
</style>
