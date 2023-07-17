import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from '../../../../../public/icons/chevronLeft';
import currentPageData from '../../../../helpers/CurrentPageData';
import baseURL from '../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../redux/Modules/Main/main.actions';
import QuickBiddingOffers from './QuickBiddingOffers';
import { screenSize } from '../../../../helpers/detectScreenSize';
import returnNestedStateValuesAsArray from '../../../../helpers/returnNestedStateValuesAsArray';
import { parseDriverState, parseVehicleState } from '../../Helpers/useGenerateFinalPayload';
import styles from '../../../../../styles/quickResults.module.css';
import usePrevious from '../../../../helpers/usePrevious';

export default () => {
  const [clickListingCount, setClickListingCount] = useState(0);
  const [open, isOpen] = useState(true);
  const dispatch = useDispatch();
  const {
    geoData, query, uuid, siteID, affid, variantObject,
  } = useSelector((store) => store.main);
  const { zipCode, currentPage, ...autoStore } = useSelector((store) => store.auto);
  const vehicleState = returnNestedStateValuesAsArray('vehicleState', autoStore);
  const driverState = returnNestedStateValuesAsArray('driverState', autoStore);
  const pageData = currentPageData(currentPage, variantObject);
  const { quickResultsFirstPage, requestQuickResults } = pageData;
  const lastPage = usePrevious(currentPage);
  const mobile = screenSize('sm');
  const screenXl2 = screenSize('xl2');
  const getQuickResults = async () => {
    isOpen(false);
    const params = {
      uuid,
      lbType: 'quickResults',
      affid: query?.affid || affid || 0,
      s5: query?.s5 || 'NA',
      site_id: siteID,
      contact: {
        lengthOfHomeOwnership: autoStore.lengthOfHomeOwnership || '24',
        streetAddress: autoStore.address || undefined,
        city: autoStore.city || geoData.city,
        state: autoStore.state || geoData.state,
        email: autoStore.email || undefined,
        phone: autoStore.phone || undefined,
        zipCode: zipCode || geoData.zip,
      },
      driverState: parseDriverState(driverState, autoStore, undefined),
      vehicleState: parseVehicleState(vehicleState, undefined),
      coverage: {
        lengthOfCurrentInsurance: autoStore.lengthOfInsurances || undefined,
        currentlyInsured: autoStore.currentlyInsured || undefined,
        driverCount: autoStore.numberOfDrivers || undefined,
        currentInsuranceCarrier: autoStore.currentlyInsured || undefined,
        policyExpiration: '7',
      },
      coreg: {
        bundleHomeInsurance: autoStore.coreg || undefined,
        bundleRenterInsurance: autoStore.coreg || undefined,
        ownedHome: autoStore.homeOwner || undefined,
        squareFeet: autoStore.squareFeet || undefined,
        yearBuilt: autoStore.yearBuilt || undefined,
        dwellingType: autoStore.dwellingType || undefined,
        propertyCoverage: autoStore.propertyCoverage || undefined,
      },
      vehicleCount: autoStore.numberOfVehicles || undefined,
    };
    const response = await fetch(`${baseURL()}/api/v2/external/lb_partial.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ params }),
    });

    const clicklistingData = await response.json();
    if (clicklistingData && clicklistingData.success && clicklistingData.clickListing) {
      const clickListingObject = typeof clicklistingData.clickListing === 'string' ? JSON.parse(clicklistingData.clickListing) : clicklistingData.clickListing;
      if (typeof clickListingObject === 'object') {
        if (quickResultsFirstPage && !mobile && !screenXl2) {
          isOpen(true);
        }
        setClickListingCount(clickListingObject.length);
        dispatch(updateMainStateAction({ leaveBehindListing: clickListingObject }));
      }
    }
  };

  useEffect(() => {
    if ((!quickResultsFirstPage || mobile || screenXl2 || quickResultsFirstPage === undefined)
      && (currentPage !== lastPage)
    ) {
      isOpen(false);
    }
  }, [currentPage, lastPage]);

  useEffect(() => {
    if (requestQuickResults) {
      getQuickResults();
    }
  }, [requestQuickResults]);
  const handleClick = () => {
    isOpen(!open);
  };
  return (
    <div className="flex items-center justify-center p-[15px] sm:w-[100%] xl2:relative sticky bottom-0">
      <div className={open ? styles.quickResultsContainer : styles.quickResultsContainerClosed}>
        <button type="button" className={styles.accordionButton} onClick={handleClick}>
          <div className="flex flex-row">
            <div className={styles.pulseCircle}>{clickListingCount}</div>
            <div>
              Great! See a few quick results
            </div>
          </div>
          <span><ChevronLeft className={!open ? styles.accordionButtonArrowDown : styles.accordionButtonArrowUp} color="#000" /></span>
        </button>
        <div className={open ? styles.animatedContainerOpen : styles.animatedContainerClosed}>
          <h1 className="text-[1.5rem] font-[600]">Your matches so far</h1>
          <h2 className="text-[1rem] font-[400]">Get even more results by completing the form</h2>
          <QuickBiddingOffers source="LB" />
        </div>
      </div>
    </div>
  );
};
