/**
 * Intended to modify form values before submitting to the backend.
 *
 * @param {Object} submission - The form values.
 * @returns {Object} The modified object.
 */
export const handleSubmission = (submission) => {
  const modified = { ...submission };
  delete modified.numberOfAdditionalAddresses;
  return modified;
};

/**
 * Map determination values to view names
 *
 * @param {Object} determination - The determination values.
 * @returns {Object} The view name.
 */
export const mapDetermination = (determination) => {
  switch (determination) {
    case 'complete':
      return 'Complete';
    case 'incomplete':
      return 'Incomplete';
    default:
      return 'Pending Review';
  }
};

/**
 * Intended to adapt old, invalid versions of the form to display (mostly) correctly
 * Could remap field names, handle unexpected data types, etc. if migrations have not
 * yet been run against DB
 *
 * @param {Object} submission - The form values.
 * @returns {Object} The modified object.
 */
export const adaptSubmission = (submission) => {
  const modified = { ...submission };
  if (submission.isSameAsBusinessAddress === false
    && typeof submission.numberOfAdditionalAddresses === 'undefined'
    && Array.isArray(submission.temporaryForeignWorkerFacilityAddresses)) {
    modified.numberOfAdditionalAddresses = submission.temporaryForeignWorkerFacilityAddresses.length;
  }
  return modified;
};
