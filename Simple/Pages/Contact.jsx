import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Input from '../../../../Common/ReusedComponents/Input';
import PhoneInput from '../../../../Common/ReusedComponents/PhoneInput';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import Title from '../../../../Common/ReusedComponents/Title';
import FormDisclaimer from '../../../Helpers/FormDisclaimer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import useValidation from '../../../../Common/Validation/useValidation';
import useSubmitForm from '../../../Helpers/useSubmitForm';
import styles from '../simple.module.css';

export default () => {
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const validate = useValidation();
  const submitForm = useSubmitForm();
  const {
    address, phone, currentPage, driverState1, city, state, zipCode, email, showLoader,
    submittingForm,
  } = useSelector((store) => store.auto);
  const { variantObject } = useSelector((store) => store.main);
  const { altStyle } = variantObject;
  const {
    tcpa, showEmail, hideAddress, fullPayload,
  } = currentPageData(currentPage, variantObject);
  const submit = async () => {
    await submitForm(fullPayload === undefined ? true : fullPayload);
    setShouldSubmit(false);
  };
  useEffect(() => {
    if (shouldSubmit) {
      submit();
    }
  }, [shouldSubmit]);
  const onSubmit = async () => {
    const valid = await validate();
    if (shouldSubmit === false && valid) {
      setShouldSubmit(true);
    }
  };
  return (
    <div>
      <Title replaceObject={[{ search: '{firstname}', replace: driverState1.firstName }]} style={styles} overrideStyle={styles.titleFinal} />
      <div className={styles.contactInputContainer}>
        {!hideAddress && (
          <div>
            <Input
              name="address"
              inputValue={address}
              label="Street Address"
              placeHolder="Street Address"
              type="text"
              overrideClasses={`${styles.contactInput} ${altStyle && styles.altInput}`}
              classes={styles}
              inputContainer="flex flex-col"
              disabled={submittingForm || showLoader}
            />
            <span className={styles.addressText}>
              {city}
              ,
              {' '}
              {state}
              {' '}
              {zipCode}
            </span>
          </div>
        )}
        <PhoneInput
          name="phone"
          inputValue={phone}
          overrideClasses={`${styles.contactInput} ${altStyle && styles.altInput}`}
          label="Phone Number"
          placeHolder="Phone Number"
          type="text"
          inputContainer="flex flex-col"
          styles={styles}
          disabled={submittingForm || showLoader}
        />
      </div>
      {
        !!showEmail && (
          <div className={styles.emailInputContainer}>
            <div>
              <Input
                classes={styles}
                label="Email"
                type="text"
                name="email"
                inputValue={email}
                overrideClasses={`${styles.emailInput} ${altStyle && styles.altInput}`}
                inputContainer="flex flex-col"
                disabled={submittingForm || showLoader}
              />
            </div>
          </div>
        )
      }
      <ContinueButton
        onClick={onSubmit}
        className={`${styles.contactButton}`}
        loaderClass={styles.finalLoader}
      >
        Get Your Free Quote
      </ContinueButton>
      {tcpa && (
        <FormDisclaimer />
      )}
    </div>
  );
};
