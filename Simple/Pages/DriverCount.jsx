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
    dispatch(updateAutoSingleKey(name, value));
    transition(updateAutoStateAction);
  };
  return (
    <>
      <Title style={style} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="driverCount"
        customCallback={handleClick}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] basis-[20%] text-center lg2:grow-0 lg2:max-w-[100%] lg2:basis-[100%]"
        listStyle={style.listStyle}
      />
    </>
  );
};
