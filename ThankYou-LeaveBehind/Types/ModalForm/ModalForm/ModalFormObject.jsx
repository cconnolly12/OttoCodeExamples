import { format, subDays, subYears } from 'date-fns';

const getAgeValue = (ageGroup) => {
  const today = new Date();
  const dobTodayMinusAge = subYears(today, ageGroup);
  const dobMinusDay = subDays(dobTodayMinusAge, 2);
  return format(dobMinusDay, 'MM-dd-yyyy');
};

export default ({
  PostFormTitle: '',
  fields: {
    zipCode: {
      type: 'number',
      label: 'ZIP',
    },
    homeOwner: {
      label: 'Homeowner',
      buttonsArray: [
        {
          title: 'Yes',
          value: true,
          active: true,
        },
        {
          title: 'No',
          value: false,
          active: false,
        },
      ],
      options: [
        {
          title: 'Yes',
          value: '1',
        },
        {
          title: 'No',
          value: '0',
        },
      ],
    },
    numberOfVehicles: {
      label: 'Multiple Vehicles',
      buttonsArray: [
        {
          title: 'Yes',
          value: '2',
          active: false,
        },
        {
          title: 'No',
          value: '1',
          active: true,
        },
      ],
    },
    numberOfDrivers: {
      label: 'Multiple Drivers',
      buttonsArray: [
        {
          title: 'Yes',
          value: '2',
          active: false,
        },
        {
          title: 'No',
          value: '1',
          active: true,
        },
      ],
    },
    ageRange: {
      type: 'select',
      title: 'Age',
      options: [
        {
          title: '< 18',
          value: getAgeValue('18'),
        },
        {
          title: '18-24',
          value: getAgeValue('18'),
        },
        {
          title: '25-34',
          value: getAgeValue('25'),
        },
        {
          title: '35-49',
          value: getAgeValue('35'),
        },
        {
          title: '50-64',
          value: getAgeValue('50'),
        },
        {
          title: '65+',
          value: getAgeValue('65'),
        },
      ],
    },
    ticketsOrDUI: {
      type: 'select',
      title: 'Good Driver: ',
      options: [
        {
          title: 'Yes',
          value: '0',
        },
        {
          title: 'No',
          value: '1',
        },
      ],
    },
    currentlyInsured: {
      type: 'checkbox',
      title: 'Currently Insured?',
      options: [
        {
          title: 'Yes',
          value: '1',
        },
        {
          title: 'No',
          value: '0',
        },
      ],
    },
    maritalStatus: {
      type: 'checkbox',
      title: 'Married?',
      options: [
        {
          title: 'Single',
          value: 'single',
        },
        {
          title: 'Married',
          value: 'married',
        },
      ],
    },
    coreg: {
      type: 'checkbox',
      label: 'Want to save by bundling home and auto policies? ',
      options: [
        {
          value: true,
          title: 'Yes',
        },
        {
          value: false,
          title: 'No',
        },
      ],
    },
  },
});
