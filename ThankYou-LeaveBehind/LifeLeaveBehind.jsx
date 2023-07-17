import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import genericStyles from './ty-lb-components.module.css';
import Header from '../../../Life/Forms/Life1/Header';
import Footer from '../../../Life/Forms/Life1/Footer';
import AnimatedContainer from './Types/Animated/AnimatedContainer';
import baseURL from '../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../redux/Modules/Main/main.actions';
import usePrevious from '../../../../helpers/usePrevious';
import DynamicForm from './Types/Form/DynamicForm';
import ModalForm from './Types/ModalForm/ModalForm';
import BiddingOffers from './Types/Bidding/BiddingOffers';
import { getVerticalFromSiteID } from '../../../../helpers/getSiteID';
import LifeBanner from '../../../Life/Forms/Life1/Components/LifeBanner';

const typeMapping = () => ({
  default: <BiddingOffers source="LB" />,
  animated: <AnimatedContainer source="LB" />,
  lbForm: <DynamicForm />,
  modal: <ModalForm />,
});

export default ({ customStyles = {} }) => {
  const dispatch = useDispatch();
  const {
    lbType, uuid, siteID, affid, query, geoData,
  } = useSelector((store) => store.main);
  const prevSiteID = usePrevious(siteID);
  const site = getVerticalFromSiteID(siteID);
  const { zipCode } = useSelector((store) => store[site]);
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
    const listingData = await response.json();
    if (listingData && typeof listingData === 'object' && listingData.length) {
      dispatch(updateMainStateAction({ leaveBehindListing: listingData }));
    }
  };
  useEffect(() => {
    if (siteID && prevSiteID !== siteID && !prevSiteID && lbType !== 'lbForm') {
      loadListingData();
    }
  }, [siteID]);

  const returnStyleSheet = (className) => customStyles[className] || genericStyles[className];
  return (
    <div className={returnStyleSheet('container')}>
      <Header returnStyleSheet={returnStyleSheet} />
      <LifeBanner />
      <div id="placeClicklisting" />
      {typeMapping()[lbType]}
      <Footer />
    </div>
  );
};
