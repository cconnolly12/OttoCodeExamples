import { parse, differenceInMonths } from 'date-fns';
import isValid from 'date-fns/isValid';
import isMatch from 'date-fns/isMatch';
import { validationMessage } from '../../Common/Validation/validationHelper';

export const isValidAgeRange = (value, dateFormat = 'MM-dd-yyyy') => {
  const currentDate = new Date();
  const parsedDate = parse(value, dateFormat, new Date());
  const difference = differenceInMonths(currentDate, (new Date(parsedDate)));
  const eighteenYearsInMonths = 12 * 18;
  const isOver18 = difference >= eighteenYearsInMonths;
  const oneHundredYearsInMonths = 12 * 100;
  const isUnder100 = difference < oneHundredYearsInMonths;
  return !(!isOver18 || !isUnder100);
};

const validAndMatchesFormat = (date, dateFormat = 'MM-dd-yyyy') => {
  let valid = !!date;
  if (valid && date.indexOf('-') > -1) {
    date.split('-').forEach((num) => {
      if (!num || Number.isNaN(+num) || num.length > 4) {
        valid = false;
      }
    });
  }
  const parsedDate = parse(date, dateFormat, new Date());
  return valid && isValid((new Date(parsedDate))) && isMatch(date, dateFormat);
};

export default (store, dateFormat) => {
  const { currentDriver } = store;
  const driverObject = store[`driverState${currentDriver}`];
  const { dob } = driverObject;
  if (validAndMatchesFormat(dob, dateFormat) && isValidAgeRange(dob, dateFormat)) {
    return validationMessage('', 'dob');
  }
  return validationMessage('Please enter a valid birth date', 'dob');
};
