import baseURL from '../../../helpers/OttoEndpoint';
import returnNestedStateValuesAsArray from '../../../helpers/returnNestedStateValuesAsArray';
import { validationMessage } from '../../Common/Validation/validationHelper';

const nameRegExp = /^[A-Za-z’ .-]{0,20}$/;

export const defaultMessage = 'Please enter a valid name';

export const nameValidation = async (driverState) => {
  const { firstName, lastName } = driverState;
  const localStorageName = `${firstName}${lastName}nameFromOtto`;
  let response;
  if (localStorage.getItem(localStorageName)) {
    response = JSON.parse(localStorage.getItem(localStorageName));
  } else if (firstName && lastName) {
    const req = `${baseURL()}/api/v2/external/validateNames.php?firstName=${firstName}&lastName=${lastName}`;
    const reqResponse = await fetch(req);
    if (reqResponse.ok) {
      response = await reqResponse.json();
      localStorage.setItem(localStorageName, JSON.stringify(response));
    }
  }
  return response;
};

export const validateSingleDriver = (driverState, driverNumber, errors, validationPromises) => {
  const validLastName = driverState.lastName && nameRegExp.test(driverState.lastName);
  const validFirstName = driverState.firstName && nameRegExp.test(driverState.firstName);
  if (!validLastName) {
    errors[`lastName${driverNumber}`] = defaultMessage;
  }
  if (!validFirstName) {
    errors[`firstName${driverNumber}`] = defaultMessage;
  }
  if (validFirstName && validLastName) {
    validationPromises.push(nameValidation(driverState));
  }
  return {
    errors, validationPromises,
  };
};

export default async (store) => {
  let errors = {};
  let validationPromises = [];
  const { currentDriver } = store;
  const driverStateObject = returnNestedStateValuesAsArray('driverState', store);

  const validation = validateSingleDriver(
    driverStateObject[+currentDriver - 1] || {},
    '',
    errors,
    validationPromises,
  );
  errors = validation.errors;
  validationPromises = validation.validationPromises;

  const responses = await Promise.all(validationPromises);

  responses.forEach((response) => {
    if (response && (!response.status || response.status === 'invalid')) {
      errors.firstName = defaultMessage;
      errors.lastName = defaultMessage;
    }
  });

  return validationMessage('', 'name', {}, errors);
};
