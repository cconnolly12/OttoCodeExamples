import { useSelector } from 'react-redux';
import Input from '../../../../Common/ReusedComponents/Input';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import { updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useValidation from '../../../../Common/Validation/useValidation';
import usePullTransunionData from '../../../Helpers/usePullTransunionData';
import currentPageData from '../../../../../helpers/CurrentPageData';
import useSkipPages from '../../../../Common/ReusedComponents/useSkipPages';

export default () => {
  const transition = usePageTransition();
  const skipPages = useSkipPages();
  const {
    main: { variantObject },
    auto: { currentPage, showLoader },
  } = useSelector((store) => store);
  const pageData = currentPageData(currentPage, variantObject);
  const pullTransunionData = usePullTransunionData();
  const validate = useValidation();
  const {
    address, city, state, zipCode,
  } = useSelector((store) => store.auto);
  const handleClick = async () => {
    const valid = await validate();
    if (valid) {
      if (pageData.transunionSubmit) {
        const handleResponse = (prefilled) => {
          if (prefilled) {
            transition(updateAutoStateAction, 'transunionReview');
          } else {
            skipPages(variantObject.additionalDriverPages);
            transition(updateAutoStateAction, 'vehicleYear');
          }
        };
        await pullTransunionData(updateAutoStateAction, handleResponse);
      } else {
        transition(updateAutoStateAction);
      }
    }
  };

  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <div>
        <Input
          name="address"
          inputValue={address}
          placeHolder="Street Address"
          label="Street Address"
          type="text"
          classes={style}
          inputContainer={style.inputContainer}
          disabled={showLoader}
        />
        <span className={style.addressText}>
          {city}
          ,
          {' '}
          {state}
          {' '}
          {zipCode}
        </span>
      </div>

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
