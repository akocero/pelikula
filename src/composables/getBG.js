import { computed, ref } from "vue";

export default function getBG() {
   const bgArray = ref([
			"/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg", // John wick
         "/tM894AtE7UQTJEoQG6qF6mdfSUT.jpg", // guardians of the galaxy
         "/70AV2Xx5FQYj20labp0EGdbjI6E.jpg", // wrath of man
	]);

   const randomBG = computed(()=> {
      return bgArray.value[
				Math.floor(Math.random() * bgArray.value.length)
			];
   })

   return { randomBG }
}
