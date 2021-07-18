import { ref } from "vue"

export default () => {
   const showModal = ref(false);
   const modalContent = ref(null);

   const handleShowModal = (movieEvent) => {
      modalContent.value = movieEvent;
      console.log("from composable modal", movieEvent);
      showModal.value = true;
   };

   const handleCloseModal = () => {
      modalContent.value = null;
      showModal.value = false;
   };

   return { modalContent, showModal, handleShowModal, handleCloseModal }
}