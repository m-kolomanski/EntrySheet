/**
 * @description Utilitary function for renaming and prettifying label strings
 * @param {string} label String to rename
 * @returns {string} Renamed string
 */
export const renameLabel = (label) => {
    return (
        String(label).replaceAll("_", " ")
    )
};
/**
 * @description Utilitary function that generates an Array with sequence if numbers in specified range, as opposed to
 *              Pythons range() function, this one includes the last end number.
 * @param {number} start First number of the generated range 
 * @param {number} end   Last number of the generater range
 * @returns {Array} Array with numbers in specified range
 */
export const range = (start, end) => {
    return [...Array((end - start + 1)).keys()].map((k) => (k + start))
};
