import { computed, ref } from "vue-demi";

const useBG = () => {
   const bgArray = ref([
			"/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg", // John wick
			"/nNX6KhETd0UIKfZStltsyg2M3v0.jpg", // Apocalypto
			"/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg", // Parasite
			"/194dso1hBwQEgIU3fgS7mXHtFAj.jpg", // city of god
         "/tM894AtE7UQTJEoQG6qF6mdfSUT.jpg", // guardians of the galaxy
         "/70AV2Xx5FQYj20labp0EGdbjI6E.jpg",
	]);

   const randomBG = computed(()=> {
      return bgArray.value[
				Math.floor(Math.random() * bgArray.value.length)
			];
   })

   return { randomBG }
}

export default useBG
