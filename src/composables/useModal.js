import { ref } from "vue";
import gsap from "gsap";

export default () => {
	const showModal = ref(false);
	const modalContent = ref(null);

	const handleShowModal = (movieEvent) => {
		modalContent.value = movieEvent;
		showModal.value = true;
	};

	const handleCloseModal = () => {
		modalContent.value = null;
		showModal.value = false;
	};

	const backdropAnim = (el, done) => {
		console.log("backdrop anim", el);
		gsap.to(el, {
			opacity: 1,
			duration: 0.4,
			onComplete: done,
		});
	};

	const backdropInit = (el) => {
		console.log("backdrop init");
		el.style.opacity = 0;
	};

	const backdropLeave = (el, done) => {
		console.log("backdrop leavce");
		gsap.to(el, {
			opacity: 0,
			duration: 0.4,
			onComplete: done,
			delay: 0.2,
		});
	};

	const modalLeave = (el, done) => {
		console.log("backdrop leavce");
		gsap.to(el, {
			opacity: 0,
			duration: 0.2,
			onComplete: done,
		});
	};

	const modalAnim = (el, done) => {
		console.log("modal anim", el);
		gsap.to(el, {
			x: "-50%",
			y: "-50%",
			scale: 1,
			opacity: 1,
			duration: 0.5,
			onComplete: done,
			delay: 0.4,
		});
	};

	const modalInit = (el) => {
		console.log("modal init");
		el.style.opacity = 0;
		el.style.transform = "scale(0.5)";
	};

	return {
		modalContent,
		showModal,
		handleShowModal,
		handleCloseModal,
		backdropAnim,
		backdropInit,
		backdropLeave,
		modalInit,
		modalAnim,
		modalLeave,
	};
};
