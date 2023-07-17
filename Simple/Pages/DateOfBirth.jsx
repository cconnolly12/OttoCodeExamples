import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import BirthDayInput from '../../../../Common/ReusedComponents/BirthDayInput';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import {
  updateAutoStateAction,
} from '../../../../../../redux/Modules/Auto/Auto.actions';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import auto37Style from '../auto37Simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useGenericUpdate from '../../../../Common/ReusedComponents/useGenericUpdate';
import useValidation from '../../../../Common/Validation/useValidation';

export default () => {
  const genericUpdate = useGenericUpdate();
  const transition = usePageTransition();
  const validate = useValidation();
  const { validationObject } = useSelector((store) => store.validation);
  const { variantObject } = useSelector((store) => store.main);
  const autoStore = useSelector((store) => store.auto);
  const { currentDriver, showLoader } = autoStore;
  const handleChangeValues = (value) => {
    genericUpdate('dob', value);
  };
  const driverStateKey = `driverState${currentDriver}`;
  const driverState = autoStore[driverStateKey];
  const { altStyle } = variantObject;
  const handleClick = async () => {
    const valid = await validate();
    if (valid) {
      const formattedDOB = driverState.dob && format(new Date(driverState.dob.replace(/-/g, '/')), 'MM-dd-yyyy');
      await genericUpdate('dob', formattedDOB);
      transition(updateAutoStateAction);
    }
  };
  return (
    <div>
      <Title style={style} replaceObject={[{ search: '{firstname}', replace: driverState.firstName }]} />
      <BirthDayInput
        name="dob"
        inputValue={driverState.dob}
        type="text"
        style={altStyle ? auto37Style : style}
        customCallback={handleChangeValues}
        disabled={showLoader}
        noErrorMessage
      />
      <div className="flex flex-col lg:mt-[-25px]">
        <ContinueButton
          onClick={handleClick}
          className={`${style.button} ${style.continueButton} ${altStyle && style.blue}`}
          overrideStyle={{ marginLeft: '0' }}
        >
          Continue
        </ContinueButton>
        {validationObject.dob && (
          <div className={style.error}>
            {validationObject.dob}
          </div>
        )}
      </div>

    </div>
  );
};
