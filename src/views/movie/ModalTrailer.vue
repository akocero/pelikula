<template>
	<div class="trailer-backdrop">
		<div class="trailer-container">
			<iframe
				:src="request.youtube + trailerLink"
				frameborder="0"
				allowfullscreen="allowfullscreen"
				mozallowfullscreen="mozallowfullscreen"
				msallowfullscreen="msallowfullscreen"
				oallowfullscreen="oallowfullscreen"
				webkitallowfullscreen="webkitallowfullscreen"
			></iframe>
			<button type="button" @click="handleClick">
				&#x2715;
			</button>
		</div>
	</div>
</template>

<script>
import request from "@/axios/request";
export default {
	name: "ModalTrailer",
	data() {
		return {
			request: request,
		};
	},
	emits: ["closeTrailer"],
	props: ["trailerLink"],
	setup(props, { emit }) {
		const handleClick = () => {
			emit("closeTrailer");
		};

		return { handleClick };
	},
};
</script>
