import { useSelector } from 'react-redux';
import { updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import Input from '../../../../Common/ReusedComponents/Input';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useValidation from '../../../../Common/Validation/useValidation';
import { screenSize } from '../../../../../helpers/detectScreenSize';

export default () => {
  const valid = useValidation();
  const transition = usePageTransition();
  const mobile = screenSize('xl2');
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage, squareFeet, showLoader } = useSelector((store) => store.auto);
  const { fields } = currentPageData(currentPage, variantObject);

  const handleClick = async () => {
    const isValid = await valid();
    if (isValid) {
      transition(updateAutoStateAction);
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
        styleOverride={{ marginBottom: 0, width: mobile ? '100%' : 280 }}
        inputContainer={style.inputContainer}
        type="number"
        disabled={showLoader}
      />
      <ContinueButton
        onClick={handleClick}
        className={`${style.button} ${style.continueButton}`}
        overrideStyle={{ marginTop: 8 }}
      >
        Continue
      </ContinueButton>
    </div>
  );
};
