import {ref} from "vue"

const useModalTrailer = () => {
   const showTrailer = ref(false);
   const trailerLink = ref(null);
   
   const playTrailer = (trailer) => {
			trailerLink.value = trailer.key;
			showTrailer.value = true;
	};

   return { showTrailer, trailerLink, playTrailer}
}


export default useModalTrailer