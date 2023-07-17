import { useDispatch, useSelector } from 'react-redux';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import { yearBuilt } from '../../../Helpers/CoregValues';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import SelectComponent from '../../../../Common/ReusedComponents/SelectComponent';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import usePageTransition from '../../../../../helpers/usePageTransition';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const {
    currentPage,
  } = useSelector((store) => store.auto);
  const yearBuiltOptionsList = yearBuilt().splice(1, 36).map((option) => (
    { value: option.value, title: option.title }
  ));
  const otherYearBuiltOptionList = yearBuilt().splice(37, 70).map((option) => (
    { value: option.value, title: option.title }
  ));
  const handleChange = (name, value) => {
    dispatch(updateAutoSingleKey(name, value));
    transition(updateAutoStateAction);
  };

  return (
    <div className="grid grid-cols-1">
      <Title style={style} />
      <ButtonContainer
        buttonsList={yearBuiltOptionsList}
        name="yearBuilt"
        className={style.button}
        containerClass="sm:px-[3px] grow-0 text-center max-w-[11%] basis-[11%] lg2:max-w-[25%] lg2:basis-[25%]"
        listStyle={style.listStyle}
      />
      {variantObject.pages[currentPage].includeSelect && (
      <div className={style.yearSelect}>
        <SelectComponent
          options={otherYearBuiltOptionList}
          name="year"
          customCallback={handleChange}
          classes={style}
          overrideClasses={style.yearBuiltSelect}
          transition
        />
      </div>
      )}
    </div>
  );
};
