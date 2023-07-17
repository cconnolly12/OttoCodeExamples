import { useSelector } from 'react-redux';
import { updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import Input from '../../../../Common/ReusedComponents/Input';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import { dwellingOptions, yearBuilt } from '../../../Helpers/CoregValues';
import usePageTransition from '../../../../../helpers/usePageTransition';
import SelectComponent from '../../../../Common/ReusedComponents/SelectComponent';
import useValidation from '../../../../Common/Validation/useValidation';

export default () => {
  const valid = useValidation();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage, squareFeet, showLoader } = useSelector((store) => store.auto);
  const { fields } = currentPageData(currentPage, variantObject);
  const { altStyle } = variantObject;
  const dwellingOptionsList = dwellingOptions('--Dwelling Type--').map((option) => (
    { value: option.value, title: option.title }
  ));
  const yearBuiltOptionsList = yearBuilt('--When Was Your Home Built? (Approximate)--').map((option) => (
    { value: option.value, title: option.title }
  ));

  const handleClick = async () => {
    const isValid = await valid();
    if (isValid) {
      transition(updateAutoStateAction, 'dateOfBirth');
    }
  };

  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <Input
        classes={style}
        name="squareFeet"
        inputValue={squareFeet}
        placeHolder={fields.squareFeet.placeHolder}
        styleOverride={{ marginBottom: 0, height: '25px' }}
        inputContainer={style.inputContainer}
        overrideClasses={`${altStyle && style.altInput} ${altStyle && style.mWidth}`}
        type="number"
        disabled={showLoader}
      />
      <SelectComponent
        options={dwellingOptionsList}
        name="dwellingType"
        inputContainer={style.inputContainer}
        classes={style}
        overrideClasses={`${altStyle && style.altInput} ${altStyle && style.smWidth}`}
      />
      <SelectComponent
        options={yearBuiltOptionsList}
        name="yearBuilt"
        inputContainer={style.inputContainer}
        classes={style}
        overrideClasses={`${altStyle && style.altInput}`}
        styleOverride={{ marginBottom: '1rem' }}
      />
      <ContinueButton
        onClick={handleClick}
        className={`${style.button} ${style.continueButton} ${altStyle && style.blue}`}
      >
        Continue
      </ContinueButton>
    </div>
  );
};
