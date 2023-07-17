import { useDispatch, useSelector } from 'react-redux';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const { altStyle } = variantObject;
  const handleClick = (name, value) => {
    let insuranceCarrier = `${value}`;
    if (!value) {
      insuranceCarrier = undefined;
      dispatch(updateAutoSingleKey('currentlyInsured', false));
    }
    dispatch(updateAutoSingleKey(name, insuranceCarrier));
    transition(updateAutoStateAction);
  };
  return (
    <>
      <Title style={style} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="currentInsurer"
        customCallback={handleClick}
        className={`${style.button} ${altStyle && style.altButton} ${altStyle && style.fullButton}`}
        containerClass={altStyle ? 'sm:max-w-[46%] sm:basis-[46%] sm:mx-[auto] basis-auto mr-[10px]'
          : 'sm:px-[3px] grow-0 text-center sm:max-w-[100%] sm:basis-[100%] md:max-w-[44%] md:basis-[33%]'}
        listStyle={style.listStyle}
      />
    </>
  );
};
