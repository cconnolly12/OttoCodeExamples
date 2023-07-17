import React, { useState } from 'react';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getVerticalFromSiteID } from '../../../../../../../helpers/getSiteID';
import updateVerticalStore from '../../../../../../../helpers/useUpdateVerticalStore';
import Input from '../../../../../ReusedComponents/Input';
import style from '../modalForm.module.css';
import shortFormObject from './ModalFormObject';
import SelectComponent from '../../../../../ReusedComponents/SelectComponent';
import Checkbox from '../inputs/Checkbox';
import ContinueButton from '../../../../ContinueButton';

const UpdateFilters = function ({
  getDynamicLeaveBehind,
  setShowModal,
  setShowFilters,
  setShowLoader,
}) {
  const dispatch = useDispatch();
  const { fields } = shortFormObject;
  const { geoData, siteID, variantObject } = useSelector((state) => state.main);
  const site = getVerticalFromSiteID(siteID);
  const updateStore = updateVerticalStore();
  const [valid, setValid] = useState(true);
  const { leaveBehindState } = useSelector((store) => store[site]);
  const { thankYouTitle } = variantObject;
  const handleChange = (name, value) => {
    setValid(true);
    dispatch(updateStore.update(
      {
        leaveBehindState: {
          ...leaveBehindState,
          [name]: value,
        },
      },
    ));
  };
  const clickCheckbox = (name, value) => {
    dispatch(updateStore.update(
      {
        leaveBehindState: {
          ...leaveBehindState,
          [name]: value,
        },
      },
    ));
    if (name === 'homeOwner' && value === false) {
      dispatch(updateStore.update(
        {
          leaveBehindState: {
            ...leaveBehindState,
            [name]: value,
            coreg: false,
          },
        },
      ));
    }
  };

  const handleSubmit = () => {
    const zipCodeRegExp = /(^\d{5}$)/;
    const validZip = !Number.isNaN(leaveBehindState.zipCode)
      && zipCodeRegExp.test(leaveBehindState.zipCode);
    if (!validZip) {
      setValid(false);
    } else {
      setShowLoader(true);
      dispatch(updateStore.update({ showLoader: true }));
      getDynamicLeaveBehind();
      setShowModal(false);
      setShowFilters(false);
      dispatch(updateStore.update({ showLoader: false }));
      setTimeout(async () => {
        setShowLoader(false);
      }, 2700);
    }
  };
  const updateFilters = () => (
    <div className={style.updateFiltersContainer}>
      <div className={style.filterRow}>
        <Input
          classes={style}
          name="zipCode"
          label="Zip:"
          inputValue={leaveBehindState.zipCode || geoData.zip}
          inputContainer={`${style.zipFilterContainer} ${style.mobileZipContainer}`}
          overrideClasses={style.zipFilterInput}
          overrideLabelStyle={style.zipFilterLabel}
          customCallback={handleChange}
          type="number"
        />
        <SelectComponent
          options={fields.ageRange.options}
          name="ageRange"
          label="Age: "
          defaultValue={leaveBehindState.ageRange}
          classes={style}
          inputContainer={style.zipFilterContainer}
          overrideClasses={style.ageSelectFilter}
          overrideLabelStyle={style.zipFilterLabel}
          customCallback={handleChange}
        />
        <SelectComponent
          options={fields.ticketsOrDUI.options}
          name="ticketsOrDUI"
          label="Good Driver: "
          defaultValue={leaveBehindState.ticketsOrDUI}
          classes={style}
          inputContainer={style.ageFilterContainer}
          overrideLabelStyle={style.zipFilterLabel}
          customCallback={handleChange}
        />
      </div>
      <Checkbox
        checked={leaveBehindState.currentlyInsured}
        transition
        label={fields.currentlyInsured.title}
        classes={style}
        name="currentlyInsured"
        inputContainer={style.driverField}
        customCallback={clickCheckbox}
      />
      <Checkbox
        checked={leaveBehindState.homeOwner}
        transition
        label="Homeowner?"
        classes={style}
        name="homeOwner"
        inputContainer={style.homeOwnerField}
        customCallback={clickCheckbox}
      />
      <Checkbox
        checked={leaveBehindState.maritalStatus}
        transition
        label={fields.maritalStatus.title}
        classes={style}
        name="maritalStatus"
        inputContainer={style.maritalField}
        customCallback={clickCheckbox}
      />
      <ContinueButton
        onClick={handleSubmit}
        loaderClass={style.loaderClass}
        buttonContainer={style.buttonContainer}
        className={style.updateButton}
        overrideStyle={{ paddingRight: '10px' }}
      >
        Update
      </ContinueButton>
      {leaveBehindState.homeOwner && (
        <div className={style.bundleContainer}>
          <Checkbox
            checked={leaveBehindState.coreg}
            transition
            label={fields.coreg.label}
            classes={style}
            name="coreg"
            customCallback={clickCheckbox}
          />
        </div>
      )}
      {!valid && <div className={style.error}>Please enter a valid zip code</div> }
    </div>
  );
  return (
    <div>
      <button
        type="button"
        className="sm:visable md:hidden absolute top-[-8px] right-[-8px] max-w-[25px] max-h-[25px] text-white bg-black rounded-full text-sm p-1 ml-auto inline-flex items-center"
        data-modal-hide="staticModal"
        onClick={() => {
          setShowModal(false);
          setShowFilters(false);
        }}
      >
        <CloseIcon />
      </button>
      <div id="dynamicLBForm" className={style.parentFormContainer1}>
        <div className={style.parentFormContainer2}>
          <div className={style.parentFormContainer3}>
            <div className={style.questionTitle}>
              {thankYouTitle}
            </div>
            {updateFilters()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFilters;
