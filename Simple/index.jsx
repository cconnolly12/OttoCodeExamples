import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transition from '../../../Common/ReusedComponents/Transition';
import Header from './Header';
import getFirstPage from '../../../../helpers/getFirstPage';
import pageMapping from './pageMapping';
import PreviousPageButton from './Components/PreviousPageButton';
import Providers from '../../../Common/ReusedComponents/Providers';
import PercentProgress from './Components/PercentProgress';
import Footer from './Footer';
import { CallAgent, CallAgentMobile } from '../../../Common/Components/callHelper';
import styles from './simple.module.css';
import { updateAutoSingleKey, updateAutoStateAction } from '../../../../../redux/Modules/Auto/Auto.actions';
import ThankYou from '../../../Common/Components/ThankYou-LeaveBehind/ThankYou';
import TransUnionLookup from '../../ReusedComponents/Transunion/TransUnionLookup';
import currentPageData from '../../../../helpers/CurrentPageData';
import { findNextPage } from '../../../../helpers/useSetNextPage';

const Simple = () => {
  const dispatch = useDispatch();
  const { variantObject, transitioning } = useSelector((store) => store.main);
  const {
    currentPage, showThankYou, currentDriver, skipPages,
  } = useSelector((store) => store.auto);
  const pageData = currentPageData(currentPage, variantObject);
  const transitionTime = variantObject.transitionTime ? variantObject.transitionTime : 0;
  useEffect(() => {
    if (!localStorage.getItem('redirectedFromLB')) {
      dispatch(updateAutoStateAction({
        currentPage: getFirstPage(variantObject),
        currentDriver: 1,
        showLoader: false,
      }));
    } else {
      const firstPage = getFirstPage(variantObject);
      const nextPage = findNextPage(firstPage, variantObject, skipPages);
      dispatch(updateAutoStateAction({
        currentPage: nextPage,
        currentDriver: 1,
        showLoader: false,
      }));
      if (currentPage === nextPage) {
        localStorage.removeItem('redirectedFromLB');
      }
    }
  }, []);
  useEffect(() => {
    if (!currentPage.includes('additionalDriver') && currentDriver > 1) {
      dispatch(updateAutoSingleKey('currentDriver', 1));
    }
    const firstPage = getFirstPage(variantObject);
    if (currentPage !== firstPage && localStorage.getItem('redirectedFromLB')) {
      localStorage.removeItem('redirectedFromLB');
    }
  }, [currentPage]);
  return currentPage ? (
    <div className={`${pageData.articlePage ? '' : styles.formPageContainer}`}>
      <Header />
      {showThankYou
        ? <ThankYou />
        : (
          <div className={`${styles.pageContainer} ${pageData.articlePage && styles.articlePageContainer}`}>
            {pageData.articlePage !== true && <PercentProgress />}
            <PreviousPageButton />
            <Transition
              transitionTime={transitionTime}
              style={styles}
              styleOverride={pageData.articlePage ? styles.articleFormContent : ''}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                {pageMapping[currentPage]}
              </form>
              <TransUnionLookup />
            </Transition>
          </div>
        )}
      {pageData.articlePage !== true && (
        <>
          <div className={styles.callTextContainer}>
            {getFirstPage(variantObject) === currentPage && transitioning === false && (
            <CallAgent styles={styles} />
            )}
            <CallAgentMobile styles={styles} />
          </div>
          <Providers styles={styles} />
        </>
      )}
      <Footer />
    </div>
  ) : '';
};

export default Simple;
