import { useSelector } from 'react-redux';
import VehicleModels from '../../../Helpers/VehicleModels';
import currentPageData from '../../../../../helpers/CurrentPageData';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import VehicleTitle from '../Components/VehicleTitle';
import style from '../simple.module.css';
import useSkipFromModel from '../../../Helpers/useSkipFromModel';

export default () => {
  const skipFromModel = useSkipFromModel();
  const { variantObject, vehiclesData } = useSelector((store) => store.main);
  const {
    currentPage, currentVehicle, skipPages, ...autoStore
  } = useSelector((store) => store.auto);
  const { showData } = currentPageData(currentPage, variantObject);
  const vehicleStateKey = `vehicleState${currentVehicle}`;
  const vehicleState = autoStore[vehicleStateKey];
  const { make } = vehicleState;
  const { altStyle } = variantObject;
  const handleChange = (name, value) => {
    skipFromModel(name, value);
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
        buttonsList={VehicleModels(make, vehiclesData)}
        name="model"
        customCallback={handleChange}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] grow-0 text-left max-w-[50%] basis-[50%] lg2:max-w-[100%] lg2:basis-[100%]"
        listStyle={style.listStyle}
        overrideStyle={{ textAlign: 'left' }}
      />
    </>
  );
};
