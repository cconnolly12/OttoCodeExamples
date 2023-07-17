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
        name="creditRating"
        className={`${style.button} ${style.buttonCredit} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] grow-0 text-left max-w-[50%] basis-[50%] lg2:max-w-[100%] lg2:basis-[100%]"
        listStyle={style.listStyle}
        overrideStyle={{ textAlign: 'left' }}
      />
    </>
  );
};
