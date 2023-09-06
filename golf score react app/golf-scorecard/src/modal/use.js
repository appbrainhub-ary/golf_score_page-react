import { useState, useEffect } from 'react';
/**
 * useModal
 * @returns Custom React Hook
 * usage:`const {modalView, modalToggle} = useModal();`
 *       `modalToggle();` e.g., for onClick
 */
const useModal = () => {
	const [modalView, setModalView] = useState(false);

	/**
	 * TODO
	 * Fix this so when multiple modals are open this only applies to the first modal
	 */
	useEffect(() => {
		if (modalView) {
			document.addEventListener('keydown', handleKeyDown);
			document.body.classList.add('light-modal-open');
		} else {
			document.body.classList.remove('light-modal-open');
		}
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [modalView]);

	function modalToggle() {
		setModalView(!modalView);
	}

	function handleKeyDown(event) {
		if (event.keyCode !== 27) return;
		modalToggle();
	}

	return {
		modalView,
		modalToggle,
	}
};

export default useModal;