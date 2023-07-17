import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import genericStyles from './ty-lb-components.module.css';
import Header from '../../../Pet/Forms/PetForm5/Header';
import Footer from '../../../Pet/Forms/PetForm5/Footer';
import AnimatedContainer from './Types/Animated/AnimatedContainer';
import baseURL from '../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../redux/Modules/Main/main.actions';
import usePrevious from '../../../../helpers/usePrevious';
import DynamicForm from './Types/Form/DynamicForm';
import ModalForm from './Types/ModalForm/ModalForm';
import BiddingOffers from './Types/Bidding/BiddingOffers';
import { getVerticalFromSiteID } from '../../../../helpers/getSiteID';

const typeMapping = () => ({
  default: <BiddingOffers source="LB" />,
  animated: <AnimatedContainer source="LB" />,
  lbForm: <DynamicForm />,
  modal: <ModalForm />,
});

export default ({ customStyles = {} }) => {
  const dispatch = useDispatch();
  const {
    lbType, leaveBehindListing, uuid, siteID, affid, query, geoData, vertical,
  } = useSelector((store) => store.main);
  const prevSiteID = usePrevious(siteID);
  const site = getVerticalFromSiteID(siteID);
  const { zipCode } = useSelector((store) => store[site]);
  const showCustomOffers = leaveBehindListing && typeof leaveBehindListing !== 'object';
  const loadListingData = async () => {
    const response = await fetch(
      `${baseURL()}/api/v2/external/getClicklisting.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            params: {
              site_id: siteID,
              source: 'LB',
              isListicle: 0,
              session: JSON.stringify({
                uuid,
                affid: affid || 0,
                s5: query?.s5 || 'NA',
                zip: zipCode || geoData.zip || '',
                lbType,
              }),
            },
          },
        ),
      },
    );
    const clone = response.clone();
    try {
      const text = await response.text();
      const data = JSON.parse(text);
      return data;
    } catch (err) {
      const text = await clone.text();
      return text;
    }
  };

  const getListingData = async () => {
    const listingData = await loadListingData();
    dispatch(updateMainStateAction({ leaveBehindListing: listingData }));
  };

  useEffect(() => {
    if (siteID && prevSiteID !== siteID && !prevSiteID && lbType !== 'lbForm') {
      getListingData();
    }
  }, [siteID]);

  useEffect(() => {
    if (showCustomOffers) {
      let ifrm = document.getElementById('myIframe');
      ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
      ifrm.document.open();
      ifrm.document.write(leaveBehindListing);
      ifrm.document.close();
    }
  }, [leaveBehindListing]);

  const returnStyleSheet = (className) => customStyles[className] || genericStyles[className];
  return (
    <div className={returnStyleSheet('petLBContainer')}>
      <Header returnStyleSheet={returnStyleSheet} />
      <div className="bg-white sm:mx-[10px]">
        {
          lbType !== 'lbForm' && (
            <div className="text-center pt-[1rem]">
              <div className="text-[23px] font-[600]">
                Based on your zip code, you are eligible for discounted
                {' '}
                {vertical}
                {' '}
                insurance!
              </div>
              {lbType === 'default' && (
              <div className="text-[20px] font-[600]">
                Click on at least 2 results below to compare plans and get the best deal!
              </div>
              )}
            </div>
          )
        }
        <div className="min-h-[500px]">
          <div id="placeClicklisting" />
          {showCustomOffers && (<iframe id="myIframe" title="advertisement" scrolling="no" className="overflow-hidden sm:w-[100%] w-[60%] sm:min-h-[30rem] min-h-[200px] m-auto" />)}
          {!showCustomOffers && typeMapping()[lbType]}
        </div>
      </div>
      <Footer />
    </div>
  );
};
