import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import useResetDrivers from '../../../Helpers/useResetDrivers';
import useGenericUpdate from '../../../../Common/ReusedComponents/useGenericUpdate';
import { updateAutoSingleKey } from '../../../../../../redux/Modules/Auto/Auto.actions';

export default () => {
  const dispatch = useDispatch();
  const resetDrivers = useResetDrivers();
  const [hideSpouse, setHideSpouse] = useState(false);
  const genericUpdate = useGenericUpdate();
  const { variantObject } = useSelector((store) => store.main);
  const autoStore = useSelector((store) => store.auto);
  const {
    currentPage, currentDriver, primaryHasSpouse, driverState1,
  } = autoStore;
  const { altStyle } = variantObject;
  useEffect(() => {
    setHideSpouse(primaryHasSpouse || driverState1.maritalStatus === 'Single');
  }, []);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const driverStateKey = `driverState${currentDriver}`;
  const driverState = autoStore[driverStateKey];
  const customCallback = (name, value) => {
    if (value === 'Spouse') {
      dispatch(updateAutoSingleKey('primaryHasSpouse', true));
    }
    genericUpdate(name, value);
    resetDrivers();
  };
  return (
    <>
      <Title style={style} replaceObject={[{ search: '{firstname}', replace: driverState.firstName }]} />
      <ButtonContainer
        buttonsList={hideSpouse ? buttonsArray.filter((button) => button.value !== 'Spouse') : buttonsArray}
        name="primaryRelationship"
        customCallback={customCallback}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] basis-[20%] text-center lg2:grow-0 lg2:max-w-[100%] lg2:basis-[100%]"
        listStyle={style.listStyle}
      />
    </>
  );
};
