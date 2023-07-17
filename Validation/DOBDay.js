import { parse } from 'date-fns';
import isValid from 'date-fns/isValid';
import isMatch from 'date-fns/isMatch';
import { validationMessage } from '../../Common/Validation/validationHelper';

const validAndMatchesFormat = (date, dateFormat = 'dd') => {
  let valid = !!date;
  if (valid) {
    if (date.length !== 2) {
      valid = false;
    }
  }
  const parsedDate = parse(date, dateFormat, new Date());
  return valid && isValid((new Date(parsedDate))) && isMatch(date, dateFormat);
};

export default (store, dateFormat) => {
  const { dobDay } = store;
  if (validAndMatchesFormat(dobDay, dateFormat)) {
    return validationMessage('', 'dobDay');
  }
  return validationMessage('Please enter a valid date', 'dobDay');
};
