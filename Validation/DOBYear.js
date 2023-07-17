import { differenceInYears, parse } from 'date-fns';
import isValid from 'date-fns/isValid';
import isMatch from 'date-fns/isMatch';
import { validationMessage } from '../../Common/Validation/validationHelper';

export const isValidAgeRangeYears = (value, dateFormat = 'yyyy') => {
  const currentDate = new Date();
  const parsedDate = parse(value, dateFormat, new Date());
  const difference = differenceInYears(currentDate, (new Date(parsedDate)));
  const isOver18 = difference >= 18;
  const isUnder100 = difference < 100;
  return !(!isOver18 || !isUnder100);
};

const validAndMatchesFormat = (date, dateFormat = 'yyyy') => {
  let valid = !!date;
  if (valid) {
    if (date.length !== 4) {
      valid = false;
    }
  }
  const parsedDate = parse(date, dateFormat, new Date());
  return valid && isValid((new Date(parsedDate))) && isMatch(date, dateFormat);
};

export default (store, dateFormat) => {
  const { currentDriver } = store;
  const driverStateKey = `driverState${currentDriver}`;
  const driverState = store[driverStateKey];
  const { dob } = driverState;
  if (validAndMatchesFormat(dob ? dob.split('-')[2] : '', dateFormat) && isValidAgeRangeYears(dob ? dob.split('-')[2] : '', dateFormat)) {
    return validationMessage('', 'dobYear');
  }
  return validationMessage('Please enter a valid year', 'dobYear');
};
