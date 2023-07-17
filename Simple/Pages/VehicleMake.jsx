import { useSelector } from 'react-redux';
import VehicleMakes from '../../../Helpers/VehicleMakes';
import currentPageData from '../../../../../helpers/CurrentPageData';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import VehicleTitle from '../Components/VehicleTitle';
import style from '../simple.module.css';
import SelectComponent from '../../../../Common/ReusedComponents/SelectComponent';
import useSkipFromMake from '../../../Helpers/useSkipFromMake';

export default () => {
  const skipFromMake = useSkipFromMake();
  const { variantObject, vehiclesData } = useSelector((store) => store.main);
  const {
    currentVehicle, currentPage, ...autoStore
  } = useSelector((store) => store.auto);
  const { showData } = currentPageData(currentPage, variantObject);
  const vehicleStateKey = `vehicleState${currentVehicle}`;
  const vehicleState = autoStore[vehicleStateKey];
  const { altStyle } = variantObject;

  const makesOnlyText = [
    { value: 'BMW', title: 'BMW' },
    { value: 'CHEVROLET', title: 'CHEVROLET' },
    { value: 'FORD', title: 'FORD' },
    { value: 'GMC', title: 'GMC' },
    { value: 'HONDA', title: 'HONDA' },
    { value: 'HYUNDAI', title: 'HYUNDAI' },
    { value: 'JEEP', title: 'JEEP' },
    { value: 'KIA', title: 'KIA' },
    { value: 'LINCOLN', title: 'LINCOLN' },
    { value: 'SUBARU', title: 'SUBARU' },
    { value: 'TOYOTA', title: 'TOYOTA' },
  ];
  const requestMakes = VehicleMakes(vehiclesData);
  const makesToShow = requestMakes.map((requestMake) => requestMake.value);
  const newMakesList = makesOnlyText.filter((makeText) => makesToShow.includes(makeText.value));

  const handleChange = (name, value) => {
    skipFromMake(name, value);
  };
  return (
    <>
      <VehicleTitle
        style={style}
        currentVehicle={currentVehicle}
        showData={showData}
        vehicleState={vehicleState}
        showVehicleData={showData}
      />
      <ButtonContainer
        buttonsList={newMakesList}
        name="make"
        customCallback={handleChange}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] grow-0 text-center max-w-[25%] basis-[25%] lg2:max-w-[50%] lg2:basis-[50%]"
        listStyle={style.listStyle}
      />
      <SelectComponent
        options={VehicleMakes(vehiclesData)}
        name="make"
        customCallback={handleChange}
        placeholder={variantObject.spanish ? 'Otros Marcas' : 'Other Makes'}
        classes={style}
        transition
        overrideClasses={altStyle && style.altInput}
      />
    </>
  );
};
