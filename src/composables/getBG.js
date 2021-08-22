import { computed, ref } from "vue";
export default function getBG() {
	const bgArray = ref([
		"/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg", // John wick
		"/gkYu744gqKYvCVTm6B69eAHZJdS.jpg", // guardians of the galaxy
		"/sFEYsEfzTx7hhjetlNrme8B5OUo.jpg", // V for vendeta
		"/aZtwH3RQ0L8jbInxr7OSc9tlGMJ.jpg", // gladiator
		"/yPOCwAYuG73pOYXsRkhqMa6ov9o.jpg", // apocalypto
		"/euFbK14mZe1lYOTiQF95tjyJlgL.jpg", // avengers end game
	]);

	const randomBG = computed(() => {
		return bgArray.value[Math.floor(Math.random() * bgArray.value.length)];
	});

	return { randomBG };
}
