import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
  updateAutoSingleKey,
  deleteNestedStateKey,
  renameNestedStateKey, updateAutoStateAction,
} from '../../../../../../redux/Modules/Auto/Auto.actions';
import { Delete } from '../../../../../../public/icons/delete';
import styles from '../simple.module.css';
import Input from '../../../../Common/ReusedComponents/Input';
import updateValidationStateAction from '../../../../../../redux/Modules/Validation/validation.actions';
import currentPageData from '../../../../../helpers/CurrentPageData';

const DriverInput = (
  {
    driverNumber,
    type = 'text',
  },
) => {
  const dispatch = useDispatch();
  const { variantObject } = useSelector((store) => store.main);
  const {
    driverCount, currentPage, showLoader, ...autoStore
  } = useSelector((store) => store.auto);
  const { hideEmail } = currentPageData(currentPage, variantObject);
  const { altStyle } = variantObject;
  const driverStateKey = `driverState${driverNumber}`;
  const driverState = autoStore[driverStateKey] || {};

  const removeDriver = (id) => {
    dispatch(updateAutoSingleKey('driverCount', driverCount - 1));
    dispatch(deleteNestedStateKey({
      storeKey: `driverState${id}`,
    }));
    if (autoStore.driverState3 && id === 2) {
      dispatch(renameNestedStateKey({
        newKey: 'driverState2',
        oldKey: 'driverState3',
      }));
    }
  };

  const handleChange = (name, value) => {
    dispatch(updateValidationStateAction({}));
    const driverValue = { ...driverState, [name]: value };
    dispatch(updateAutoStateAction({ [driverStateKey]: driverValue }));
  };

  return (
    <div className={driverNumber > 1 ? styles.driverContainer : ''}>
      {driverNumber > 1 ? (
        <span className={styles.driverNumberLine}>
          Driver #
          {driverNumber}
          <button
            type="button"
            className={styles.removeDriverButton}
            onClick={() => removeDriver(driverNumber)}
          >
            <Delete
              className={styles.removeDriverIcon}
            />
            Remove Driver
          </button>
        </span>
      ) : ''}
      <div className={styles.driverNamesInputContainer}>
        <div className={styles.nameInputContainer}>
          <div>
            <Input
              classes={styles}
              label="First Name"
              overrideLabelStyle={styles.driverNameInput}
              placeHolder="First Name"
              type={type}
              name="firstName"
              customCallback={handleChange}
              inputValue={driverState.firstName}
              nestedCount={driverNumber}
              overrideClasses={`${styles.nameInput} ${altStyle && styles.altInput}`}
              inputContainer="flex flex-col"
              disabled={showLoader}
            />
          </div>
        </div>
        <div className={styles.nameInputContainer}>
          <div>
            <Input
              classes={styles}
              label="Last Name"
              overrideLabelStyle={styles.driverNameInput}
              placeHolder="Last Name"
              type={type}
              name="lastName"
              customCallback={handleChange}
              inputValue={driverState.lastName}
              nestedCount={driverNumber}
              overrideClasses={`${styles.nameInput} ${altStyle && styles.altInput}`}
              inputContainer="flex flex-col"
              disabled={showLoader}
            />
          </div>
        </div>
      </div>
      {driverNumber === 1 && !hideEmail && (
      <div className={styles.driverNamesInputContainer}>
        <div className={styles.emailInputContainer}>
          <div>
            <Input
              classes={styles}
              label="Email"
              overrideLabelStyle={styles.driverNameInput}
              placeHolder="Email"
              type={type}
              name="email"
              inputValue={autoStore.email}
              overrideClasses={`${styles.emailInput} ${altStyle && styles.altInput}`}
              inputContainer="flex flex-col"
              disabled={showLoader}
            />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default DriverInput;
