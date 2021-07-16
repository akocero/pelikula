<template>
	<div class="card">
		<div class="card__img">
			<img
				:src="
					request.imagePaths.w138 + '/nNdjhe4t5CSqcFGCa7ERe40OW2o.jpg'
				"
				alt=""
			/>
		</div>

		<div class="card__body">
			<h4 class="card__sub-title">Eugene Paul Badato</h4>
			<h4 class="card__title">Bertong Madlangtuta</h4>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
export default {
	name: "Card",
	data() {
		return {
			request: request,
		};
	},
};
</script>

<style></style>
