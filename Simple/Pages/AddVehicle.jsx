import { useDispatch, useSelector } from 'react-redux';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import textSuffix from '../../../../../helpers/textSuffix';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage, currentVehicle, vehicleCount } = useSelector((store) => store.auto);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const vehicleNumber = textSuffix(+currentVehicle + 1);
  const { altStyle } = variantObject;
  const handleClick = (name, value) => {
    if (value === 'Yes') {
      dispatch(updateAutoSingleKey('currentVehicle', currentVehicle + 1));
      dispatch(updateAutoSingleKey('vehicleCount', vehicleCount + 1));
      transition(updateAutoStateAction, 'vehicleYear');
    } else {
      transition(updateAutoStateAction);
    }
  };

  const replaceObject = [{ search: '{newNumber}', replace: vehicleNumber }];
  return (
    <>
      <Title style={style} replaceObject={replaceObject} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="addVehicle"
        customCallback={handleClick}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        listStyle={style.listStyle}
      />
    </>
  );
};
