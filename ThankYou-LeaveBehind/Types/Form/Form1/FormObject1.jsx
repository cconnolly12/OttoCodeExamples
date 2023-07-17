import { format, subDays, subYears } from 'date-fns';
import Header from './Header';
import ProgressBar from './ProgressBar';
import TicketsOrDUIPage from './TicketsOrDUIPage';
import transitions from './Transitions';

const getAgeValue = (ageGroup) => {
  const today = new Date();
  const dobTodayMinusAge = subYears(today, ageGroup);
  const dobMinusDay = subDays(dobTodayMinusAge, 2);
  return format(dobMinusDay, 'MM-dd-yyyy');
};

export default ({
  ProgressBar,
  Header,
  transitions,
  PostFormTitle: '',
  pages: {
    currentlyInsured: {
      type: 'button',
      percentage: '5%',
      parentSpacing: {
        xs: 12,
        md: 3,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'Are you currently insured?',
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
      type: 'button',
      percentage: '10%',
      parentSpacing: {
        xs: 12,
        md: 6,
      },
      spacing: {
        xs: 12,
        md: 2,
      },
      title: 'How many vehicles need coverage?',
      options: [
        {
          title: '1',
          value: '1',
        },
        {
          title: '2',
          value: '2',
        },
        {
          title: '3',
          value: '3',
        },
        {
          title: '4',
          value: '4',
        },
        {
          title: '5+',
          value: '5',
        },
      ],
    },
    numberOfDrivers: {
      type: 'button',
      percentage: '20%',
      parentSpacing: {
        xs: 12,
        md: 4,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'How many drivers need coverage?',
      options: [
        {
          title: '1',
          value: '1',
        },
        {
          title: '2 or more',
          value: '2',
        },
      ],
    },
    homeOwner: {
      type: 'button',
      percentage: '30%',
      parentSpacing: {
        xs: 12,
        md: 4,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'Are you a homeowner?',
      options: [
        {
          title: 'Yes, Own',
          value: '1',
        },
        {
          title: 'No, Rent',
          value: '0',
        },
      ],
    },
    ageRange: {
      type: 'button',
      buttonClass: 'spacedButtons',
      percentage: '40%',
      parentSpacing: {
        xs: 12,
        md: 4,
      },
      spacing: {
        xs: 12,
        md: 4,
      },
      title: 'What is your age range?',
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
    creditScore: {
      type: 'button',
      percentage: '50%',
      parentSpacing: {
        xs: 12,
        md: 5,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'How is your credit?',
      options: [
        {
          title: 'Excellent',
          title2: '(750+)',
          value: 'excellent',
        },
        {
          title: 'Good',
          title2: '(700-749)',
          value: 'good',
        },
        {
          title: 'Average',
          title2: '(650-699)',
          value: 'average',
        },
        {
          title: 'Poor',
          title2: '(<649)',
          value: 'poor',
        },
      ],
    },
    ticketsOrDUI: {
      type: 'override',
      buttonClass: 'spacedButtons',
      percentage: '60%',
      parentSpacing: {
        xs: 12,
        md: 6,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'In the past 3 years, any?',
      options: ['override'],
      Override: TicketsOrDUIPage,
    },
    driversLicense: {
      type: 'button',
      percentage: '70%',
      parentSpacing: {
        xs: 12,
        md: 3,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'Is your driver\'s license active?',
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
    gender: {
      type: 'button',
      percentage: '75%',
      parentSpacing: {
        xs: 12,
        md: 3,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'Your gender?',
      options: [
        {
          title: 'Male',
          value: 'male',
        },
        {
          title: 'Female',
          value: 'female',
        },
      ],
    },
    maritalStatus: {
      type: 'button',
      percentage: '80%',
      parentSpacing: {
        xs: 12,
        md: 3,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'Your marital status?',
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
    annualMileage: {
      type: 'button',
      buttonClass: 'spacedButtons',
      percentage: '90%',
      parentSpacing: {
        xs: 12,
        md: 6,
      },
      spacing: {
        xs: 12,
        md: 4,
      },
      title: 'Annual mileage for your main vehicle?',
      options: [
        {
          title: 'Less than 5,000',
          value: '4900',
        },
        {
          title: '5,001 to 7,500',
          value: '5001',
        },
        {
          title: '7,501 to 10,000',
          value: '7501',
        },
        {
          title: '10,001 to 12,500',
          value: '10001',
        },
        {
          title: '12,501 to 15,000',
          value: '12501',
        },
        {
          title: 'More than 15,000',
          value: '15000',
        },
      ],
    },
    lengthOfInsurances: {
      type: 'button',
      percentage: '95%',
      parentSpacing: {
        xs: 12,
        md: 5,
      },
      spacing: {
        xs: 12,
        md: 5,
      },
      title: 'How long have you been insured?',
      options: [
        {
          title: 'Less than a year',
          value: '11',
        },
        {
          title: '1 or more years',
          value: '24',
        },
      ],
    },
    vehicleOwnership: {
      type: 'button',
      buttonClass: 'spacedButtons',
      percentage: '99%',
      parentSpacing: {
        xs: 12,
        md: 5,
      },
      spacing: {
        xs: 12,
        md: 4,
      },
      title: 'Ownership of your main vehicle?',
      options: [
        {
          title: 'Owned',
          value: 'owned',
        },
        {
          title: 'Financed',
          value: 'financed',
        },
        {
          title: 'Leased',
          value: 'leased',
        },
      ],
    },
  },
});
