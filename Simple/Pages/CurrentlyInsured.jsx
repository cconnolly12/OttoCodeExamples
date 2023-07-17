import { useDispatch, useSelector } from 'react-redux';
import {
  updateAutoSingleKey,
  updateAutoStateAction,
} from '../../../../../../redux/Modules/Auto/Auto.actions';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useSkipPages from '../../../../Common/ReusedComponents/useSkipPages';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const setSkipPages = useSkipPages();
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const { altStyle } = variantObject;

  const handleClick = (name, value) => {
    dispatch(updateAutoSingleKey(name, value === 'Yes'));
    if (value === 'No') {
      setSkipPages(['currentInsurer'])
        .then(() => transition(updateAutoStateAction, 'gender'));
    } else {
      setSkipPages([], ['currentInsurer'])
        .then(() => transition(updateAutoStateAction, 'currentInsurer'));
    }
  };
  return (
    <>
      <Title style={style} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="currentlyInsured"
        customCallback={handleClick}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        listStyle={style.listStyle}
      />
    </>
  );
};
