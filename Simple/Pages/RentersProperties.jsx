import { useSelector } from 'react-redux';
import { updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import Title from '../../../../Common/ReusedComponents/Title';
import { propertyCoverage, yearBuilt } from '../../../Helpers/CoregValues';
import style from '../simple.module.css';
import ContinueButton from '../../../../Common/Components/ContinueButton';
import usePageTransition from '../../../../../helpers/usePageTransition';
import SelectComponent from '../../../../Common/ReusedComponents/SelectComponent';
import useValidation from '../../../../Common/Validation/useValidation';

export default () => {
  const valid = useValidation();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const { altStyle } = variantObject;
  const propertyPersonalCoverageList = propertyCoverage.map((option) => (
    { value: option.value, title: option.title }
  ));
  const yearBuiltOptionsList = yearBuilt('-- Select a year --').map((option) => (
    { value: option.value, title: option.title }
  ));

  const handleClick = async () => {
    const isValid = await valid();
    if (isValid) {
      transition(updateAutoStateAction);
    }
  };
  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <SelectComponent
        options={propertyPersonalCoverageList}
        name="propertyCoverage"
        overrideClasses={`${style.rentersDropdownCoverage} ${altStyle && style.altInput}`}
        classes={style}
      />
      <SelectComponent
        options={yearBuiltOptionsList}
        name="yearBuilt"
        overrideClasses={`${style.rentersDropdownYear} ${altStyle && style.altInput}`}
        classes={style}
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
