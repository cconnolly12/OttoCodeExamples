import React from 'react';
import format from 'date-fns/format';
import { useSelector } from 'react-redux';

const defaultHeaders = (brand) => ({
  header1: `Thank you for joining ${brand}`,
  header2: '',
  header3: '',
});

const defaultReplacements = ({
  brand: '',
  firstName: 'Drivers',
  lastName: '',
  city: 'Your City',
  state: 'Your State',
  today: '',
});

const findAndReplaceInstances = (string, search, value, replacementKey) => (
  string.split(' ').map((word) => {
    if (word.indexOf(search) !== -1 && value) {
      return word.replace(search, value);
    }
    if (word.indexOf(search) !== -1) {
      return word.replace(search, defaultReplacements[replacementKey]);
    }
    return word;
  })
    .join(' ')
);

const replacementKeywords = (replacementValues) => ({
  '{BRAND}': (header) => findAndReplaceInstances(header, '{BRAND}', replacementValues.brand, 'brand'),
  '{CITY}': (header) => findAndReplaceInstances(header, '{CITY}', replacementValues.city, 'city'),
  '{STATE}': (header) => findAndReplaceInstances(header, '{STATE}', replacementValues.state, 'state'),
  '{NAME}': (header) => findAndReplaceInstances(header, '{NAME}', replacementValues.firstName, 'firstName'),
  '{LAST_NAME}': (header) => findAndReplaceInstances(header, '{LAST_NAME}', replacementValues.lastName, 'lastName'),
  '{YEAR}': (header) => findAndReplaceInstances(header, '{YEAR}', format(new Date(), 'yyyy'), 'year'),
});

export const useFormatHeaders = () => {
  const { brandData, thankYouHeaders } = useSelector((store) => store.main);
  const { driverState1, ...autoState } = useSelector((store) => store.auto);
  const defaults = defaultHeaders(brandData.display_name);
  const groupedTitleValues = { brand: brandData.display_name, ...driverState1, ...autoState };
  const replacementFunctions = replacementKeywords({ ...groupedTitleValues });
  let {
    head1: header1 = `Thank you for joining ${brandData.display_name}`,
    head2: header2 = 'Someone will be calling you shortly. Please check your email for additional discounts.',
    head3: header3 = '',
  } = thankYouHeaders;

  Object.keys(replacementFunctions).forEach(
    (keyword) => {
      header1 = header1 && replacementFunctions[keyword](header1);
      header2 = header2 && replacementFunctions[keyword](header2);
      header3 = header3 && replacementFunctions[keyword](header3);
    },
  );

  return () => ({
    header1: header1 || defaults.header1,
    header2: header2 || defaults.header2,
    header3: header3 || defaults.header3,
  });
};

const HeaderText = ({ tyType, classes = {} }) => {
  const formattedHeaders = useFormatHeaders();
  return (
    <div className={`${classes.tyTitleContainer} ${tyType === 'animated' ? classes.animatedTyContainer : ''}`}>
      <h1 id="tyHeader1" className={classes.tyTitle}>
        {formattedHeaders().header1 || ''}
      </h1>
      <h2 className={classes.tyTitle2}>
        {formattedHeaders().header2 || ''}
      </h2>
      <h3 className={classes.tySubTitle}>
        {formattedHeaders().header3 || ''}
      </h3>
    </div>
  );
};

export default HeaderText;
