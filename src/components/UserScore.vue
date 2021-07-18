<template>
	<div class="percent">
		<svg>
			<circle cx="24" cy="24" r="24"></circle>
			<circle
				cx="24"
				cy="24"
				r="24"
				:style="{
					strokeDashoffset: `calc(148 - (148 * ${validPercent}) / 100)`,
				}"
			></circle>
		</svg>
		<div class="number">
			<p>{{ validPercent }}<span>%</span></p>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "UserScore",
	props: {
		percent: Number,
	},
	setup(props) {
		const validPercent = ref(0);
		if (props.percent) {
			validPercent.value =
				props.percent?.toString().length <= 1
					? props.percent.toString() + "0"
					: props.percent?.toString().replace(".", "");
		}

		return { validPercent };
		// console.log(validPercent);
	},
};
</script>

<style></style>
