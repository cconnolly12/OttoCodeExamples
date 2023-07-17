import { useSelector, useDispatch } from 'react-redux';
import VehicleTrims from '../../../Helpers/VehicleTrims';
import { updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import usePageTransition from '../../../../../helpers/usePageTransition';
import currentPageData from '../../../../../helpers/CurrentPageData';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import VehicleTitle from '../Components/VehicleTitle';
import style from '../simple.module.css';

export default () => {
  const { variantObject, vehiclesData } = useSelector((store) => store.main);
  const {
    currentPage, currentVehicle, skipPages, ...autoStore
  } = useSelector((store) => store.auto);
  const { showData } = currentPageData(currentPage, variantObject);
  const vehicleStateKey = `vehicleState${currentVehicle}`;
  const vehicleState = autoStore[vehicleStateKey];
  const {
    make, model,
  } = vehicleState;
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const { altStyle } = variantObject;

  const handleCustomCallback = (name, inputValue) => {
    const trim = inputValue.split('-')[0];
    const vin = inputValue.split('-')[1];
    const vehicleValue = { ...vehicleState, trim, vin };
    dispatch(updateAutoStateAction({ [vehicleStateKey]: vehicleValue }));
    transition(updateAutoStateAction);
  };

  return (
    <>
      <VehicleTitle
        style={style}
        currentVehicle={currentVehicle}
        showVehicleData={showData}
        vehicleState={vehicleState}
      />
      <ButtonContainer
        buttonsList={VehicleTrims(make, model, vehiclesData)}
        name="trim"
        className={`${style.button} ${altStyle && style.altButton}`}
        customCallback={handleCustomCallback}
        containerClass="sm:px-[3px] grow-0 text-center max-w-[50%] basis-[50%] lg2:max-w-[100%] lg2:basis-[100%]"
        listStyle={style.listStyle}
      />
    </>
  );
};
