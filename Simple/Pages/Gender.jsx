import { useSelector } from 'react-redux';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import Title from '../../../../Common/ReusedComponents/Title';
import style from '../simple.module.css';

export default () => {
  const { variantObject } = useSelector((store) => store.main);
  const autoStore = useSelector((store) => store.auto);
  const { currentPage, currentDriver } = autoStore;
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  const driverStateKey = `driverState${currentDriver}`;
  const driverState = autoStore[driverStateKey];
  const { altStyle } = variantObject;
  return (
    <>
      <Title style={style} replaceObject={[{ search: '{firstname}', replace: driverState.firstName }]} />
      <ButtonContainer
        buttonsList={buttonsArray}
        name="gender"
        className={`${style.button} ${altStyle && style.altButton} ${altStyle && style.fullButton}`}
        containerClass={altStyle ? 'sm:max-w-[46%] sm:basis-[46%] sm:mx-[auto] basis-auto mr-[15px]'
          : 'sm:px-[3px] basis-[20%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]'}
        listStyle={style.listStyle}
      />
    </>
  );
};
