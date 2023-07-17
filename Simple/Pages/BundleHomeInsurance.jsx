import { useDispatch, useSelector } from 'react-redux';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';
import ButtonContainer from '../../../../Common/ReusedComponents/ButtonContainer';
import currentPageData from '../../../../../helpers/CurrentPageData';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';
import useSkipPages from '../../../../Common/ReusedComponents/useSkipPages';

export default () => {
  const dispatch = useDispatch();
  const transition = usePageTransition();
  const setSkipPages = useSkipPages();
  const { variantObject, brandData } = useSelector((store) => store.main);
  const { currentPage, homeOwner } = useSelector((store) => store.auto);
  const { buttonsArray = [] } = currentPageData(currentPage, variantObject);
  // need to add to variant 4 and 10 for simple
  const isFullCoreg = !!variantObject.fullCoreg;
  // need to add to variant 10 of simple
  const isFullCoregDriverCount = !!variantObject.resetDriverCount;
  const skipCoregPages = ['homeProperties', 'rentersProperties', 'squareFeet', 'dwellingType', 'propertyCoverage', 'yearBuilt'];
  const { altStyle } = variantObject;
  const isRenter = (!homeOwner || homeOwner === 'false');
  const handleClick = (name, value) => {
    dispatch(updateAutoSingleKey(name, value));
    let skipPage;
    let showPage;
    let nextPage;
    if (!value || value === 'false') {
      nextPage = isFullCoreg && isFullCoregDriverCount ? 'driverCount' : 'dateOfBirth';
      dispatch(updateAutoSingleKey('propertyCoverage', undefined));
      setSkipPages(skipCoregPages);
    } else {
      if (isFullCoreg) {
        nextPage = isRenter ? 'propertyCoverage' : 'squareFeet';
        skipPage = isRenter ? ['squareFeet', 'dwellingType'] : ['propertyCoverage'];
        showPage = isRenter ? ['propertyCoverage'] : ['squareFeet', 'dwellingType'];
      } else {
        nextPage = isRenter ? 'rentersProperties' : 'homeProperties';
        skipPage = isRenter ? ['homeProperties'] : ['rentersProperties'];
        showPage = isRenter ? ['rentersProperties'] : ['homeProperties'];
        isRenter ? dispatch(updateAutoSingleKey('propertyCoverage', '15000')) : '';
      }
      setSkipPages(skipPage, showPage);
    }
    transition(updateAutoStateAction, nextPage);
  };

  const homeOwnerText = 'Would you like to also receive home insurance policy quotes? You may be able to bundle and save even more on your auto policy.';
  const rentersText = `Would you like to receive a renters insurance quote emailed to you from a ${brandData.domain.indexOf('otto') > -1 ? 'Otto Quotes' : brandData.display_name} preferred partner?`;
  const titleText = homeOwner ? homeOwnerText : rentersText;
  return (
    <>
      <div className={style.title}>
        {titleText}
      </div>
      <ButtonContainer
        buttonsList={buttonsArray}
        name="coreg"
        customCallback={handleClick}
        className={`${style.button} ${altStyle && style.altButton}`}
        containerClass="sm:px-[3px] basis-[11%] text-center lg2:grow-0 lg2:max-w-[50%] lg2:basis-[50%]"
        listStyle={style.listStyle}
        activeClass={style.buttonActive}
      />
    </>
  );
};
