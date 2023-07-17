import { useSelector } from 'react-redux';
import Input from '../../../../Common/ReusedComponents/Input';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import useLeaveBehindRedirect from '../../../Helpers/useLeaveBehindRedirect';

export default () => {
  const leaveBehindRedirect = useLeaveBehindRedirect();
  const { variantObject } = useSelector((store) => store.main);
  const { zipCode, showLoader } = useSelector((store) => store.auto);
  const { altStyle } = variantObject;
  const handleClick = async () => {
    await leaveBehindRedirect();
  };
  return (
    <div className={style.zipPageContainer}>
      <Title style={style} overrideStyle={style.zipTitle} />
      <div className={style.listStyle}>
        <Input
          classes={style}
          name="zipCode"
          inputValue={zipCode}
          inputContainer={style.inputContainer}
          overrideClasses={`${altStyle && style.altInput}`}
          type="number"
          disabled={showLoader}
        />
        <ContinueButton
          onClick={handleClick}
          className={`${style.button} ${style.continueButton} ${altStyle && style.blue}`}
          buttonContainer={style.continueButtonContainer}
          loaderClass={style.loader}
          overrideStyle={{ marginTop: 8 }}
        >
          Check Rates
        </ContinueButton>
      </div>
    </div>
  );
};
