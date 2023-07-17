import { useSelector } from 'react-redux';
import currentPageData from '../../../../../helpers/CurrentPageData';
import style from '../simple.module.css';
import usePageTransition from '../../../../../helpers/usePageTransition';
import { updateAutoStateAction } from '../../../../../../redux/Modules/Auto/Auto.actions';

export default () => {
  const { variantObject } = useSelector((store) => store.main);
  const { currentPage } = useSelector((store) => store.auto);
  const transition = usePageTransition();
  const { firstPage } = currentPageData(currentPage, variantObject);
  const handleClick = () => {
    transition(updateAutoStateAction, '', true);
  };
  return !firstPage ? (
    <button className={style.previousPageButton} type="button" onClick={handleClick}>
      &#8249; Previous Question
    </button>
  ) : '';
};
