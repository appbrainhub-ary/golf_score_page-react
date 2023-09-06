/**
 * Replaces non-digit element value with an empty string
 * @param {*} el
 * @returns
 */
export function digitVal(el) {
	if (el.value && isNaN(el.value)) {
		return el.value.replace(/[^\d]+/g,'');
	} else {
		return el.value;
	}
}