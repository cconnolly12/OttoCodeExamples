import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import useResetDrivers from '../../../Helpers/useResetDrivers';
import useGenericUpdate from '../../../../Common/ReusedComponents/useGenericUpdate';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import usePageTransition from '../../../../../helpers/usePageTransition';

export default () => {
  const transition = usePageTransition();
  const dispatch = useDispatch();
  const resetDrivers = useResetDrivers();
  const genericUpdate = useGenericUpdate();
  const { variantObject } = useSelector((store) => store.main);
  const autoStore = useSelector((store) => store.auto);
  useEffect(() => {
    if (currentPage === 'additionalDriverMaritalStatus' && +currentDriver === 1) {
      dispatch(updateAutoSingleKey('currentDriver', 2));
    }
  }, []);
  const {
    currentPage, currentDriver, driverState1, primaryHasSpouse, driverCount,
  } = autoStore;
  const { forceNextPage, buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const driverStateKey = `driverState${currentDriver}`;
  const driverState = autoStore[driverStateKey];
  const { altStyle } = variantObject;
  const customCallback = (name, value) => {
    if (+currentDriver > 2 && value === 'Married' && !primaryHasSpouse && driverState1.maritalStatus === 'Married') {
      genericUpdate(name, value, false, false, { primaryRelationship: 'Spouse', maritalStatus: value });
      dispatch(updateAutoSingleKey('primaryHasSpouse', true));
      if (+driverCount > 2) {
        resetDrivers();
      } else {
        transition(updateAutoStateAction, forceNextPage);
      }
    } else {
      genericUpdate(name, value);
      transition(updateAutoStateAction);
    }
  };
  return (
    <>
      <Title
        style={style}
        replaceObject={[{ search: '{firstname}', replace: driverState.firstName }]}
        updateOnChange
      />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="maritalStatus"
        className={`${style.button} ${altStyle && style.altButton}`}
        customCallback={customCallback}
        containerClass="sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        listStyle={style.listStyle}
      />
    </>
  );
};
