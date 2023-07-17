import returnNestedStateValuesAsArray from '../../../helpers/returnNestedStateValuesAsArray';
import { validationMessage } from '../../Common/Validation/validationHelper';
import { validateSingleDriver } from './Name';

export default async (store) => {
  let errors = {};
  let validationPromises = [];
  const defaultMessage = 'Please enter a valid name';
  const driverStateObject = returnNestedStateValuesAsArray('driverState', store);
  const invalidDriverCount = Object.values(driverStateObject).length < +store.driverCount;

  Object.values(driverStateObject).forEach((driverState, index) => {
    const driverCount = index + 1;
    const validation = validateSingleDriver(driverState, driverCount, errors, validationPromises);
    errors = validation.errors;
    validationPromises = validation.validationPromises;
  });

  const responses = await Promise.all(validationPromises || []);

  responses.forEach((response, index) => {
    if (response && (!response.status || response.status === 'invalid')) {
      const driverCount = index + 1;
      errors[`firstName${driverCount}`] = defaultMessage;
      errors[`lastName${driverCount}`] = defaultMessage;
    }
  });

  if (invalidDriverCount) {
    [1, 2, 3, 4].forEach((number) => {
      if (number > Object.values(driverStateObject).length) {
        errors[`firstName${number}`] = defaultMessage;
        errors[`lastName${number}`] = defaultMessage;
      }
    });
  }

  return validationMessage('', 'names', {}, errors);
};
