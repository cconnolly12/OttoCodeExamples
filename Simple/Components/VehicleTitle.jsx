import textSuffix from '../../../../../helpers/textSuffix';
import Title from '../../../../Common/ReusedComponents/Title';

export default ({
  currentVehicle, vehicleMake, vehicleModel, style, vehicleState, showVehicleData = false,
}) => {
  const replaceObject = [
    { search: '{vehiclenumber}', replace: +currentVehicle === 1 ? 'Select Your' : textSuffix(currentVehicle) },
    { search: '{vehicleMake}', replace: vehicleMake },
    { search: '{vehicleModel}', replace: vehicleModel },
  ];
  return (
    <>
      {showVehicleData && (
        <p className={style.questionLabel}>
          {vehicleState.year}
          {' '}
          {vehicleState.make}
          {' '}
          {vehicleState.model}
        </p>
      )}
      <Title
        style={style}
        replaceObject={replaceObject}
      />
    </>
  );
};
