import { useDispatch, useSelector } from 'react-redux';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import {
  updateAutoSingleKey,
  updateAutoStateAction,
} from '../../../../../../redux/Modules/Auto/Auto.actions';
import usePageTransition from '../../../../../helpers/usePageTransition';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const { noCoreg, altStyle } = variantObject;
  const handleClick = (name, value) => {
    if (noCoreg) {
      dispatch(updateAutoSingleKey('coreg', false));
    }
    dispatch(updateAutoSingleKey(name, value));
    transition(updateAutoStateAction);
  };
  return (
    <>
      <Title style={style} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="homeOwner"
        className={`${style.button} ${altStyle && style.altButton}`}
        customCallback={handleClick}
        containerClass={
          altStyle
            ? 'basis-[33%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]'
            : 'sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]'
        }
        listStyle={style.listStyle}
      />
    </>
  );
};
