import { useDispatch, useSelector } from 'react-redux';
import TransunionReview from '../../../ReusedComponents/Transunion/TransunionReview';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import usePageTransition from '../../../../../helpers/usePageTransition';
import currentPageData from '../../../../../helpers/CurrentPageData';
import useSkipPages from '../../../../Common/ReusedComponents/useSkipPages';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const skipPages = useSkipPages();
  const {
    main: { variantObject },
    auto: {
      currentPage, vehicleState1, driverState1,
    },
  } = useSelector((store) => store);
  const autoStore = useSelector((store) => store.auto);
  const pageData = currentPageData(currentPage, variantObject);
  const handleClick = async () => {
    let skipDriverPages = [];
    let removeSkipDriverPages = [];
    let skipVehiclePages = [];
    let removeSkipVehiclePages = [];
    const driverCount = (Object.keys(autoStore).filter((key) => key.includes('driverState'))).length;
    dispatch(
      updateAutoSingleKey(
        'driverCount',
        driverCount,
      ),
    );
    // additionalDriverMaritalStatus
    if (driverCount > 1) {
      removeSkipDriverPages = variantObject.additionalDriverPages || [];
    } else {
      skipDriverPages = variantObject.additionalDriverPages || [];
    }
    if (!driverState1.gender) {
      removeSkipDriverPages.push('gender');
    }
    if (
      vehicleState1
      && Object.keys(vehicleState1).length
      && (
        vehicleState1.year
        && vehicleState1.make
        && vehicleState1.model
        && vehicleState1.trim
        && vehicleState1.vin
      )
    ) {
      skipVehiclePages = pageData.vehiclePages || [];
      transition(updateAutoStateAction, pageData.nextPage);
    } else {
      removeSkipVehiclePages = pageData.vehiclePages || [];
      transition(updateAutoStateAction, 'vehicleYear');
    }
    await skipPages(
      [...skipDriverPages, ...skipVehiclePages],
      [...removeSkipVehiclePages, ...removeSkipDriverPages],
    );
  };

  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <TransunionReview customStyles={style} />
      <ContinueButton
        onClick={handleClick}
        loaderClass={style.loaderClass}
        className={`${style.button} ${style.continueButton}`}
      >
        Continue
      </ContinueButton>
    </div>
  );
};
