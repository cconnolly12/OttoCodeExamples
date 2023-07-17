import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import VehicleYears from '../../../Helpers/VehicleYears';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import SelectComponent from '../../../../Common/ReusedComponents/SelectComponent';
import VehicleTitle from '../../../../Common/ReusedComponents/VehicleTitle';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useSkipPages from '../../../../Common/ReusedComponents/useSkipPages';
import RequestVehicleData from '../../../Helpers/RequestVehicleData';
import updateMainStateAction from '../../../../../../redux/Modules/Main/main.actions';
import DefaultVehicleData from '../../../../../../Testing/VehicleData.json';

export default () => {
  const setSkipPages = useSkipPages();
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const {
    currentPage, currentVehicle, skipPages, ...autoStore
  } = useSelector((store) => store.auto);
  const vehicleStateKey = `vehicleState${currentVehicle}`;
  const vehicleState = autoStore[vehicleStateKey];
  const otherYearsList = VehicleYears().splice(27);
  const { altStyle } = variantObject;
  useEffect(() => {
    if (currentVehicle >= 2
      && (autoStore.vehicleState1 && Object.keys(autoStore.vehicleState1).length === 0)) {
      dispatch(updateAutoSingleKey('currentVehicle', 1));
      dispatch(updateAutoSingleKey('vehicleCount', 1));
    } else if (currentVehicle >= 2) {
      setSkipPages(['addVehicle'], ['vehicleMake', 'vehicleModel', 'vehicleTrim']);
      dispatch(updateAutoSingleKey('vehicleCount', currentVehicle));
    } else {
      dispatch(updateAutoSingleKey('vehicleCount', 1));
    }
  }, []);
  const handleCustomCallback = async (name, inputValue) => {
    dispatch(updateAutoSingleKey('requestMade', true));
    const vehicleValue = { ...vehicleState, [name]: inputValue };
    dispatch(updateAutoStateAction({ [vehicleStateKey]: vehicleValue }));
    const vehiclesData = await RequestVehicleData(inputValue);
    if (vehiclesData.data && vehiclesData.data.data && vehiclesData.success) {
      dispatch(updateMainStateAction({ vehiclesData: vehiclesData.data.data }));
    } else {
      dispatch(updateMainStateAction({ vehiclesData: DefaultVehicleData }));
    }
    dispatch(updateAutoSingleKey('requestMade', false));
    transition(updateAutoStateAction);
  };

  return (
    <div>
      <VehicleTitle
        style={style}
        currentVehicle={currentVehicle}
      />
      <ButtonContainer
        buttonsList={VehicleYears(25)}
        name="year"
        customCallback={handleCustomCallback}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[25%] lg2:basis-[25%]"
        listStyle={style.listStyle}
      />
      {variantObject.pages[currentPage].includeSelect && (
        <div className={style.yearSelect}>
          <SelectComponent
            options={otherYearsList}
            name="year"
            customCallback={handleCustomCallback}
            placeholder={variantObject.spanish ? 'Seleccionar año anterior' : 'Select Previous Year'}
            classes={style}
            overrideClasses={style.vehicleYearSelect}
            transition
          />
        </div>
      )}
    </div>
  );
};
