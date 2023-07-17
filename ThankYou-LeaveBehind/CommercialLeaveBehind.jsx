import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import genericStyles from './ty-lb-components.module.css';
import Header from '../../../Commercial/Forms/Commercial1/Header';
import Footer from '../../../Commercial/Forms/Commercial1/Footer';
import Providers from '../../ReusedComponents/Providers';
import AnimatedContainer from './Types/Animated/AnimatedContainer';
import baseURL from '../../../../helpers/OttoEndpoint';
import updateMainStateAction from '../../../../../redux/Modules/Main/main.actions';
import usePrevious from '../../../../helpers/usePrevious';
import DynamicForm from './Types/Form/DynamicForm';
import BiddingOffers from './Types/Bidding/BiddingOffers';

const typeMapping = () => ({
  default: <BiddingOffers source="LB" />,
  animated: <AnimatedContainer source="LB" />,
  lbForm: <DynamicForm />,
});

export default ({ customStyles = {} }) => {
  const dispatch = useDispatch();
  const {
    lbType, uuid, siteID, affid, query, geoData,
  } = useSelector((store) => store.main);
  const prevSiteID = usePrevious(siteID);
  const { zipCode } = useSelector((store) => store.auto);
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
    if (siteID && prevSiteID !== siteID && !prevSiteID) {
      loadListingData();
    }
  }, [siteID]);

  const returnStyleSheet = (className) => customStyles[className] || genericStyles[className];
  return (
    <div className={returnStyleSheet('container')}>
      <Header />
      {
        lbType !== 'lbForm' && (
          <div className={returnStyleSheet('banner')}>
            <div className={returnStyleSheet('bannerTitle')}>
              Based on your zip code, you are eligible for commercial insurance!
            </div>
          </div>
        )
      }
      <div id="placeClicklisting" />
      {typeMapping()[lbType]}
      <Providers styles={genericStyles} />
      <Footer />
    </div>
  );
};
