import zipValidation from '../../Common/Validation/Zipcode';
import addressValidation from '../../Common/Validation/Address';
import dobValidation from './DOB';
import dobYearValidation from './DOBYear';
import dobMonthValidation from './DOBMonth';
import dobDayValidation from './DOBDay';
import nonEmptyValue from '../../Common/Validation/NonEmptyValue';
import emailValidation from '../../Common/Validation/Email';
import multiNameValidation from './Names';
import singleNameValidation from './Name';
import phoneValidation from '../../Common/Validation/Phone';
import squareFeetValidation from './SquareFeet';
import selectVehicles from '../../Common/Validation/SelectVehicles';

export const validationMapping = async (field, autoStore, mainStore) => {
  switch (field) {
    case 'zipCode':
      return zipValidation(autoStore.zipCode, autoStore, mainStore);
    case 'address':
      return addressValidation(autoStore);
    case 'dob':
      return dobValidation(autoStore, 'MM-dd-yyyy');
    case 'dobYear':
      return dobYearValidation(autoStore, 'yyyy');
    case 'dobMonth':
      return dobMonthValidation(autoStore, 'MM');
    case 'dobDay':
      return dobDayValidation(autoStore, 'dd');
    case 'email':
      return emailValidation(autoStore.email);
    case 'names':
      return multiNameValidation(autoStore);
    case 'name':
      return singleNameValidation(autoStore);
    case 'phone':
      return phoneValidation(autoStore.phone, mainStore.uuid);
    case 'squareFeet':
      return squareFeetValidation(autoStore.squareFeet);
    case 'yearBuilt':
      return nonEmptyValue(autoStore.yearBuilt, field, autoStore.yearBuilt !== '-1');
    case 'propertyCoverage':
      return nonEmptyValue(autoStore.propertyCoverage, field, autoStore.propertyCoverage !== '-1');
    case 'vehicles':
      return selectVehicles(autoStore);
    case 'make':
      return nonEmptyValue(autoStore[`vehicleState${autoStore.currentVehicle}`].make, field);
    case 'dwellingType':
      return nonEmptyValue(autoStore.dwellingType, field, autoStore.dwellingType !== '-1');
    case 'city':
      return nonEmptyValue(autoStore.city, field);
    case 'state':
      return nonEmptyValue(autoStore.state, field, autoStore.state !== '-1');
    default:
      return '';
  }
};
