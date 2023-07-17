import { useSelector } from 'react-redux';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';

export default () => {
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const { altStyle } = variantObject;
  return (
    <>
      <Title style={style} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="vehicleCount"
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass={
          altStyle
            ? 'basis-[33%] text-center lg2:grow-0 lg2:max-w-[100%] lg2:basis-[100%]'
            : 'sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[100%] lg2:basis-[100%]'
        }
        listStyle={style.listStyle}
      />
    </>
  );
};
