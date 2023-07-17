import { useDispatch, useSelector } from 'react-redux';
import { updateAutoStateAction, updateAutoSingleKey } from '../../../../../../redux/Modules/Auto/Auto.actions';
import DriverInput from '../Components/DriverInput';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useSkipPages from '../../../../Common/ReusedComponents/useSkipPages';
import useValidation from '../../../../Common/Validation/useValidation';
import currentPageData from '../../../../../helpers/CurrentPageData';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const setSkipPages = useSkipPages();
  const validation = useValidation();
  const { variantObject } = useSelector((store) => store.main);
  const {
    driverCount, currentPage,
  } = useSelector((store) => store.auto);
  const { transunionFirstPage, altStyle } = currentPageData(currentPage, variantObject);
  const continueClick = async () => {
    const valid = await validation();
    if (!valid) {
      return;
    }
    const additionalDriverPages = variantObject.additionalDriverPages || [];
    let forcedPage;
    if (transunionFirstPage) {
      transition(updateAutoStateAction);
    } else if (+driverCount === 1) {
      await setSkipPages(additionalDriverPages);
      const { pages } = variantObject;
      const currentPageIndex = Object.keys(pages).indexOf(currentPage);
      Object.keys(pages).forEach((page, index) => {
        if (index > currentPageIndex && additionalDriverPages.indexOf(page) === -1) {
          if (!forcedPage) {
            forcedPage = page;
          }
        }
      });
    } else {
      dispatch(updateAutoSingleKey('currentDriver', 2));
      await setSkipPages([], additionalDriverPages);
      forcedPage = additionalDriverPages[0] || '';
    }
    transition(updateAutoStateAction, forcedPage);
  };
  const drivers = parseInt(driverCount, 10);
  const renderDrivers = () => {
    const inputs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < drivers; i++) {
      inputs.push(<DriverInput driverNumber={i + 1} label />);
    }
    return inputs;
  };
  return (
    <>
      {renderDrivers()}
      <ContinueButton
        onClick={continueClick}
        className={`${style.button} ${style.continueButton} ${altStyle && style.blue}`}
        loaderClass={style.loader}
      >
        Continue
      </ContinueButton>
    </>
  );
};
