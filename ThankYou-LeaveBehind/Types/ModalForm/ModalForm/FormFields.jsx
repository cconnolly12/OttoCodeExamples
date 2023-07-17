import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVerticalFromSiteID } from '../../../../../../../helpers/getSiteID';
import updateVerticalStore from '../../../../../../../helpers/useUpdateVerticalStore';
import Input from '../../../../../ReusedComponents/Input';
import ButtonContainerCheck from '../inputs/ButtonContainerCheck';
import Checkbox from '../inputs/Checkbox';
import ContinueButton from '../../../../ContinueButton';
import shortFormObject from './ModalFormObject';
import style from '../modalForm.module.css';
import Header from './Header';

const FormFields = function ({
  getDynamicLeaveBehind,
  setShowModal,
  setShowForm,
  setShowLoader,
}) {
  const dispatch = useDispatch();
  const { fields } = shortFormObject;
  const { geoData, siteID, variantObject } = useSelector((state) => state.main);
  const [valid, setValid] = useState(true);
  const site = getVerticalFromSiteID(siteID);
  const updateStore = updateVerticalStore();
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
  const handleClick = (name, value) => {
    const fieldObject = fields[name];
    let indexOfChoice;
    fieldObject.buttonsArray.forEach((field, index) => {
      if (field.value === value) {
        indexOfChoice = index;
      }
    });
    fieldObject.buttonsArray[indexOfChoice].active = true;
    fieldObject.buttonsArray[indexOfChoice === 0 ? 1 : 0].active = false;
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
  const clickCheckbox = (name, value) => {
    dispatch(updateStore.update(
      {
        leaveBehindState: {
          ...leaveBehindState,
          [name]: value,
        },
      },
    ));
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
      setShowForm(false);
      dispatch(updateStore.update({ showLoader: false }));
      setTimeout(async () => {
        setShowLoader(false);
      }, 2700);
    }
  };
  const modalForm = () => (
    <div className={style.shortFormContainer}>
      <Input
        classes={style}
        name="zipCode"
        inputValue={leaveBehindState.zipCode || geoData.zip}
        inputContainer={style.inputContainer}
        label={fields.zipCode.label}
        customCallback={handleChange}
        type="number"
        styleOverride={{ border: !valid ? '1px solid red' : '' }}
      />
      <ButtonContainerCheck
        buttonsList={fields.homeOwner.buttonsArray}
        name="homeOwner"
        className={style.buttonCheck}
        activeClass={style.activeButton}
        containerClass="basis-[50%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        wrapperStyle={style.checkListWrapper}
        listStyle={` ${style.ButtonCheckListStyle}`}
        label={fields.homeOwner.label}
        labelStyle={style.label}
        customCallback={handleClick}
      />
      <ButtonContainerCheck
        buttonsList={fields.numberOfVehicles.buttonsArray}
        name="numberOfVehicles"
        className={style.buttonCheck}
        activeClass={style.activeButton}
        containerClass="basis-[50%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        wrapperStyle={style.checkListWrapper}
        listStyle={` ${style.ButtonCheckListStyle}`}
        label={fields.numberOfVehicles.label}
        labelStyle={style.label}
        customCallback={handleClick}
      />
      <ButtonContainerCheck
        buttonsList={fields.numberOfDrivers.buttonsArray}
        name="numberOfDrivers"
        className={style.buttonCheck}
        activeClass={style.activeButton}
        containerClass="basis-[50%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        wrapperStyle={style.checkListWrapper}
        listStyle={` ${style.ButtonCheckListStyle}`}
        label={fields.numberOfDrivers.label}
        labelStyle={style.label}
        customCallback={handleClick}
      />
      {leaveBehindState.homeOwner && (
        <div className={style.bundleModalContainer}>
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
    </div>
  );
  return (
    <>
      <div className="flex items-start justify-between flex-col items-center rounded-t">
        <Header
          setShowModal={setShowModal}
          setShowForm={setShowForm}
          style={style}
          thankYouTitle={thankYouTitle}
        />
      </div>
      <div>
        <div id="dynamicLBForm" className={style.parentFormContainer1}>
          <div className={style.parentFormContainer2}>
            <div className={style.parentFormContainer3}>
              <div className={style.questionTitle}>
                {thankYouTitle}
              </div>
              {modalForm()}
              {!valid && <div className={style.error}>Please enter a valid zip code</div> }
              <ContinueButton
                onClick={handleSubmit}
                loaderClass={style.loaderClass}
                buttonContainer={style.buttonContainer}
                className={style.continueButton}
                overrideStyle={{ paddingRight: '10px' }}
              >
                Compare Quotes Now
              </ContinueButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center p-6 space-x-2 text-center justify-center">
        <button
          className={style.continueText}
          type="button"
          data-modal-hide="staticModal"
          onClick={() => setShowModal(false)}
        >
          No thanks, continue to see results
        </button>
      </div>
    </>
  );
};

export default FormFields;
