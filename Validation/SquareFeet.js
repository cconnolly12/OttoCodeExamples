import { validationMessage } from '../../Common/Validation/validationHelper';

const formatValidationReturn = (valid, errorMessage) => {
  let message = '';
  if (!valid) {
    message = errorMessage;
    return validationMessage(message, 'squareFeet');
  }
  return validationMessage('', 'squareFeet');
};

export default (value) => {
  const nonEmptyValue = /^\d+$/.test(value);
  if (!nonEmptyValue) {
    return formatValidationReturn(nonEmptyValue, 'Please enter a valid value');
  }
  const validValue = parseFloat(value) >= 500 && parseFloat(value) < 10000;

  return formatValidationReturn(validValue, 'Square footage must be at least 500 and less than 10,000');
};
