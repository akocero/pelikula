<template>
	<div class="skeleton-wrapper">
		<div class="skeleton-heading">
			<div class="row">
				<div class="col"><Skeleton type="skeleton__poster" /></div>
				<div class="col">
					<Skeleton type="skeleton__title" />
					<Skeleton type="skeleton__text" />
					<Skeleton type="skeleton__text" />
					<Skeleton type="skeleton__text" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Skeleton from "./BaseSkeleton.vue";
export default {
	name: "SkeletonHeading",
	components: {
		Skeleton,
	},
};
</script>

<style></style>
